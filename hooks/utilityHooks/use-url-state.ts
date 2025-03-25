"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

/**
 * A hook that stores state in URL query parameters, mimicking the useState API
 * With special handling for conversationId and recepientId to ensure they're mutually exclusive
 * @param key The query parameter key to use
 * @param initialValue The initial value to use if the query parameter is not present
 * @returns A tuple of [value, setValue] similar to useState
 */
export function useUrlState<T>(key: string, initialValue?: T): [T, (value: T | ((prevValue: T) => T)) => void] {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get the current value from URL or use initialValue
  const getValueFromUrl = useCallback((): T => {
    if (typeof window === "undefined") return initialValue as T

    const paramValue = searchParams.get(key)
    if (paramValue === null) return initialValue as T

    try {
      // Try to parse as JSON for objects and arrays
      return JSON.parse(paramValue)
    } catch (e) {
      // If not valid JSON, return as is (string)
      return paramValue as unknown as T
    }
  }, [key, searchParams, initialValue])

  // Local state to handle the value before the URL is updated
  const [value, setValue] = useState<T>(getValueFromUrl)

  // Update URL when value changes, with special handling for conversationId/recepientId
  const updateUrl = useCallback(
    (newValue: T) => {
      const newParams = new URLSearchParams(searchParams.toString())

      // Special handling for mutually exclusive conversationId and recepientId
      if ((key === "conversationId" || key === "recepientId") && newValue !== null && newValue !== undefined) {
        // If setting conversationId, remove recepientId
        if (key === "conversationId") {
          newParams.delete("recepientId")
        }
        // If setting recepientId, remove conversationId
        else if (key === "recepientId") {
          newParams.delete("conversationId")
        }
      }

      // Handle the current parameter
      if (newValue === undefined || newValue === null) {
        newParams.delete(key)
      } else {
        const serializedValue = typeof newValue === "object" ? JSON.stringify(newValue) : String(newValue)

        newParams.set(key, serializedValue)
      }

      // Create the new URL with updated query parameters
      const newUrl = `${window.location.pathname}?${newParams.toString()}`

      // Update the URL without refreshing the page
      router.push(newUrl, { scroll: false })
    },
    [key, router, searchParams],
  )

  // Set value function (mimics useState's setter)
  const setValueAndUpdateUrl = useCallback(
    (newValueOrFunction: T | ((prevValue: T) => T)) => {
      setValue((prevValue) => {
        const newValue =
          typeof newValueOrFunction === "function"
            ? (newValueOrFunction as (prevValue: T) => T)(prevValue)
            : newValueOrFunction

        // Update URL
        updateUrl(newValue)

        return newValue
      })
    },
    [updateUrl],
  )

  // Sync with URL on mount and when URL changes
  useEffect(() => {
    const urlValue = getValueFromUrl()
    setValue(urlValue)
  }, [getValueFromUrl, searchParams])

  return [value, setValueAndUpdateUrl]
}


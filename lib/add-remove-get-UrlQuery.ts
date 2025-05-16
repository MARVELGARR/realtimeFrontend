
import { URLSearchParams } from "node:url"
export const AddRemoveUrlQuery = (queryName: string, queryItem: number | string) => {
    const NewQueryParam = new URLSearchParams(window.location.search)
    NewQueryParam.set(queryName, queryItem.toLocaleString())
    window.location.search = NewQueryParam.toString()
}



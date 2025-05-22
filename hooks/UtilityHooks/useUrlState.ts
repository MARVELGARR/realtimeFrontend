import { useState } from "react";

const useUrlState = () => {
  const [urlState, setUrlState] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const state: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      state[key] = value;
    });
    return state;
  });

  const updateUrlState = (newState: Record<string, string | undefined>) => {
    const searchParams = new URLSearchParams(window.location.search);
    const updatedState = { ...urlState }; // for local state update

    Object.entries(newState).forEach(([key, value]) => {
      if (value === undefined) {
        searchParams.delete(key);
        delete updatedState[key];
      } else {
        searchParams.set(key, value);
        updatedState[key] = value;
      }
    });

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${searchParams.toString()}`
    );

    setUrlState(updatedState);
  };

  return [urlState, updateUrlState] as const;
};

export default useUrlState;

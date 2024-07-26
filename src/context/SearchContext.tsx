import React, { createContext, useEffect, useState } from "react";

export const SearchContext = createContext({});

const LOCALSTORAGE_KEY = "filters";

export const SearchProvider = ({ children }) => {
  const loadPersisted = () => {
    try {
      const result = window.localStorage.getItem(LOCALSTORAGE_KEY);
      if (result) {
        return JSON.parse(result);
      }
    } catch {}
    return null;
  };

  const defaults = loadPersisted();

  const [query, setQuery] = useState("");
  const [showTestnets, setShowTestnets] = useState(
    defaults?.showTestnets ?? true
  );
  const [showDeprecated, setShowDeprecated] = useState(
    defaults?.showDeprecated ?? false
  );

  const [showFlagged, setShowFlagged] = useState(
    defaults?.showFlagged ?? false
  );

  useEffect(() => {
    const str = JSON.stringify({ showTestnets, showDeprecated, showFlagged });
    window.localStorage.setItem(LOCALSTORAGE_KEY, str);
  }, [showTestnets, showDeprecated, showFlagged]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        showTestnets,
        setShowTestnets,
        showDeprecated,
        setShowDeprecated,
        showFlagged,
        setShowFlagged
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

import React, { createContext, useState } from "react";

export const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [showTestnets, setShowTestnets] = useState(false);
  const [showDeprecated, setShowDeprecated] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        showTestnets,
        setShowTestnets,
        showDeprecated,
        setShowDeprecated
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

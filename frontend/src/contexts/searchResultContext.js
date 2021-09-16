import { createContext, useContext } from "react";
import useSearch from "../hooks/useSearch";

const SearchResultContext = createContext();

const SearchResultContextProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useSearch('');

  return (
    <SearchResultContext.Provider value={[searchResult, setSearchResult]}>
      {children}
    </SearchResultContext.Provider>
  );
};

const useSearchResultContext = () => {
  return useContext(SearchResultContext);
};

export { SearchResultContext, SearchResultContextProvider, useSearchResultContext };
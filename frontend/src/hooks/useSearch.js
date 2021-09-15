import { useState, useEffect } from "react";

const useEntries = () => {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiencias`);

      if (res.ok) {
        const body = await res.json();
        setSearchResult(body.data);
      }
    };

    fetchEntries();
  }, []);

  return [searchResult, setSearchResult];
};

export default useEntries;

import { useState, useEffect } from "react";

const UselatestExperiences = () => {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const date = new Date();
      const isoDate = date.toISOString().split('T')[0];
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiencias/search?fechaInicial=${isoDate}`);
      
      if (res.ok) {
        const body = await res.json();
        setSearchResult(body.data);
      }
    };

    fetchEntries();
  }, []);

  return [searchResult, setSearchResult];
};

export default UselatestExperiences;

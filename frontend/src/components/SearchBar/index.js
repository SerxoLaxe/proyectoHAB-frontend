import { useState } from "react";
import FormError from '../FormError'
import { useSearchResultContext } from "../../contexts/searchResultContext";

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  const [error, setError] = useState('');
  const [, setSearchResult] = useSearchResultContext();

  async function search(e) {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/experiencias/search?` + 
      new URLSearchParams({
        texto: searchText
      }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      setError("");
      const body = await res.json();
      console.log(body.data);
      setSearchResult(body.data)
      
    } else {
      const error = await res.json();
      setError(error.message);
    }

  }

  return (
    <>
      <form className='search-bar' onSubmit={search}>
        <input
        autoFocus='true'
          type='text'
          placeholder='Busca aquí tu próxima aventura'
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <input
          type='button'
          value='filtro'
          onClick={() => {
            if (filterButtonClicked){
              setFilterButtonClicked(false);
            } else {
              setFilterButtonClicked(true);
            }
            
          }} />
        <input
          type='submit'
          value='Buscar' />
      </form>
      {filterButtonClicked && <p>Clicaste el botón de filtro</p>}
      {error && <FormError error={error}/>}
    </>
  );
}

export default SearchBar;
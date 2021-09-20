import { useState } from "react";
//import FormError from '../FormError'
import './style.css'
import { useHistory } from "react-router";

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  //const [error, setError] = useState('');
  const history = useHistory();

  async function goToSearch(e) {
    e.preventDefault();
    history.push(
      `/app/search?` + new URLSearchParams({
        texto: searchText
      }))
    }
  

  return (
    <div className='search-bar'>
      <form className='search-form' onSubmit={goToSearch}>
        <input
          autoFocus
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
            if (filterButtonClicked) {
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
      { }
     {/*  {error && <FormError error={error} />} */}
    </div>
  );
}

export default SearchBar;
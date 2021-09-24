import { useState } from "react";
//import FormError from '../FormError'
import './style.css'
import { useHistory } from "react-router";

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [mouseEnteredFilter, setMouseEnteredFilter] = useState(false);
  const [searchParams, setSearchParams] = useState(new URLSearchParams())
  //const [error, setError] = useState('');
  const history = useHistory();


  async function goToSearch(e) {
    e.preventDefault();
    if (searchText.length > 0) {
      searchParams.append('texto', searchText)
    }
    if (startDate.length > 0) {
      searchParams.append('fechaInicial', startDate);
    }
    if (endDate.length > 0) {
      searchParams.append('fechaFinal', endDate);
    }
    if (minPrice.length > 0) {
      searchParams.append('precioMinimo', minPrice);
    }
    if (maxPrice.length > 0) {
      searchParams.append('precioMaximo', maxPrice);
    }

    history.push(`/app/search?` + searchParams);
    setSearchParams(new URLSearchParams());
  }

  function reset() {
    setStartDate('');
    setEndDate('');
    setMinPrice('');
    setMaxPrice('');
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
        <div className='filter-component'
          onMouseEnter={() => {
            setMouseEnteredFilter(true);
          }}
          onMouseLeave={() => {
            setMouseEnteredFilter(false);
          }} >
          <input
            id='filter-button'
            type='button'
            value='filtro'
          />
          {mouseEnteredFilter && (
            <div className='search-filter-menu'>
              <div className='date-div'>
                <label htmlFor='fechaInicial'>Fecha inicial</label>
                <input name='fechaInicial' type='date' onChange={(e) => { setStartDate(e.target.value) }} value={startDate} />
                <label htmlFor='fechaFinal'>Fecha final</label>
                <input name='fechaFinal' type='date' onChange={(e) => { setEndDate(e.target.value) }} value={endDate} />
              </div>
              <div className='price-div'>
                <label htmlFor='minPrice'>precio mínimo</label>
                <input name='minPrice' type='number' onChange={(e) => { setMinPrice(e.target.value) }} value={minPrice} />
                <label htmlFor='maxPrice'>precio máximo</label>
                <input name='maxPrice' type='number' onChange={(e) => { setMaxPrice(e.target.value) }} value={maxPrice} />
              </div>
              <button onClick={reset}>reset</button>
            </div>
          )}
        </div>
        <input
          type='submit'
          value='Buscar'
        />
      </form>
      {/*  {error && <FormError error={error} />} */}
    </div>
  );
}

export default SearchBar;
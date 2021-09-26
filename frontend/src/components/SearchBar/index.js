import { useRef, useState, useEffect } from "react";
import './style.css'
import { useHistory } from "react-router";

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useState(new URLSearchParams())
  const [error, setError] = useState('');
  const history = useHistory();
  const node = useRef();

  const handleClickOutside = e => {
    //console.log("clicking anywhere");
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setFilterMenuOpen(false);
  };

  useEffect(() => {
    if (filterMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterMenuOpen]);


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

    if (searchParams.toString().length === 0) {
      setError('Introduce al menos un parámetro de búsqueda.')
    } else {
      setError('');
      history.push(`/app/search?` + searchParams);
      setSearchParams(new URLSearchParams());
    }
  }

  function reset() {
    setStartDate('');
    setEndDate('');
    setMinPrice('');
    setMaxPrice('');
  }

  return (
    <div className='search-bar' ref={node}>
      <form className='search-form' onSubmit={goToSearch}>
        <input
          autoFocus
          type='text'
          placeholder={error ? `${error}` : 'Busca aquí tu proxima aventura'}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <div className='filter-component'
          onClick={() => { setFilterMenuOpen(true); }}>
          <input
            id='filter-button'
            type='button'
            value='filtro'
          />
          {filterMenuOpen && (
            <div className='search-filter-menu' /* onPressEnter={console.log('lalala')} */>
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
              <button type='button' onClick={reset}>reset</button>
            </div>
          )}
        </div>
        <input
          type='submit'
          value='Buscar'
        />
      </form>
    </div>
  );
}

export default SearchBar;
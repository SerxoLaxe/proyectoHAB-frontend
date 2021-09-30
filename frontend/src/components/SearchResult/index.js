import List from "../List";
import ExperienceSmall from "../ExperienceSmall";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import './style.css';
import NoResultsMessage from "./NoResultsMessage";
import RollingTumbleweed from "../../animations/RollingTumbleweed";

const SearchResult = () => {

  const [searchResult, setSearchResult] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [searchParams,setSearchParams ] = useState();

  useEffect(() => {
    async function fetchSearch() {
      const currentPath = location.search;
      const searchString = new URLSearchParams(currentPath);
      setSearchParams(searchString); 
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/experiencias/search?` +
        searchString,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        //setError("");
        const body = await res.json();
        setSearchResult(body.data);
      } else {
        // const error = await res.json();
        //setError(error.message);
      }
      setLoading(false)
    }
    fetchSearch();
  }, [location]);

  return (
    <>
      {loading
        ?
        <p>Cargando...</p>
        :
        <div className='search-result-wrapper'>
          <h1 id='text-searched'>{searchParams.get('texto')?.length > 0 && searchParams.get('texto')}</h1>
          <div id='filters-applied-div'>
            {searchParams.get('precioMinimo')?.length > 0 && <p id='min-price'>{`a partir de ${searchParams.get('precioMinimo')}€`}</p>}
            {searchParams.get('precioMaximo')?.length > 0 && <p id='min-price'>{`hasta ${searchParams.get('precioMaximo')}€`}</p>}
            {searchParams.get('fechaInicial')?.length > 0 && <p id='min-price'>{`desde el ${searchParams.get('fechaInicial')}`}</p>}
            {searchParams.get('fechaFinal')?.length > 0 && <p id='min-price'>{`hasta el ${searchParams.get('fechaFinal')}`}</p>}
          </div>

          {searchResult.length > 0
            ?
            <>
              <List
                className='experiences-grid'
                data={searchResult}
                render={(experiencia) =>
                (<ExperienceSmall className='experience' key={experiencia.id}
                  name={experiencia.nombre}
                  description={experiencia.descripcion}
                  rating={experiencia.rating}
                  price={experiencia.precio}
                  seats={experiencia.plazas_totales}
                  id={experiencia.id}
                  thumbnails={experiencia.thumbnails} />)
                } />
            </>
            :
            <>
              <NoResultsMessage className='texts' />
              <RollingTumbleweed id='tumbleweed-animation' />
            </>
          }
        </div>}
    </>
  );
}

export default SearchResult;
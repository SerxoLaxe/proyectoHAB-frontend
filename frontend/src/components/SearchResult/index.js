import List from "../List";
import ExperienceSmall from "../ExperienceSmall";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";


const SearchResult = () => {

  const { search } = useLocation();
  
  const [searchResult, setSearchResult] = useState([]);
  console.log(search);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const queryText = query.get('texto');
  console.log(query.get('texto'));

  useEffect(() => {
    async function fetchSearch() {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/experiencias/search?` +
        new URLSearchParams({
          texto: query.get('texto'),
        }),
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
        setSearchResult(body.data)
        console.log(body.data);

      } else {
        // const error = await res.json();
        //setError(error.message);
      }
    }

    fetchSearch();
  }, [search]);

  return (
    <div>
      {searchResult.length > 0
        &&
        (<List
          className='experiences-list'
          data={searchResult}
          render={(experiencia, index) =>
          (<ExperienceSmall className='experience'
            key={index}
            name={experiencia.nombre}
            description={experiencia.descripcion}
            rating={experiencia.rating}
            price={experiencia.precio}
            seats={experiencia.plazas_totales}
            location={experiencia.ubicacion}
            startDate={experiencia.fecha_inicial}
            endDate={experiencia.fecha_final}
            id={experiencia.id}
            thumbnails={experiencia.thumbnails} />)
          }
        />)
      }
    </div>
  );
}

export default SearchResult;
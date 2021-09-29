import Footer from "../../components/Footer";
import Header from "../../components/Header";
import List from "../../components/List";
import ExperienceSmall from "../../components/ExperienceSmall";
//import { useSearchResultContext } from "../../contexts/searchResultContext";
import "./style.css";

const HomePage = () => {
  const [searchResult] = useSearchResultContext();

  return (
    <div id="home-page">
      <Header />
      {searchResult.length > 0 && (
        <List
          className="experiences-list"
          data={searchResult}
          render={(experiencia, index) => (
            <ExperienceSmall
              className="experience"
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
              thumbnails={experiencia.thumbnails}
            />
          )}
        />
      )}
      <Footer />
    </div>
  );
};

export default HomePage;

import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useParams, Redirect } from "react-router";
import useGetProfile from "../../hooks/useGetProfile";
import List from "../../components/List";
import UserProfile from "../../components/UserProfile";
import ExperienceSmall from "../../components/ExperienceSmall";
import { useEffect } from "react";

const ProfilePage = () => {

  const [token] = useUserTokenContext();
  let { id } = useParams();
  const [userProfile] = useGetProfile(id, token);


  console.log(userProfile);


  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      {searchResult.length > 0
        ?
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
        :
        <UserProfile />
      }
    </div>

  );
}

export default ProfilePage;
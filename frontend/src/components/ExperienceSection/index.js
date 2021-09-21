import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUserProfile from "../../hooks/useUserProfile";

const ExperienceSection = () => {
  const { id } = useParams();
  const [token] = useUserTokenContext();
  const [loggedUser] = useUserProfile(token);
  const [experience, setExperience] = useState();
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    async function fetchExperience() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiencias/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

      if (res.ok) {
        //setError("");
        const body = await res.json();
        setExperience(body.data);
        setLoading(false);

      } else {
        // const error = await res.json();
        //setError(error.message);
      }

    }
    fetchExperience();
  }, [id]);


  return (<>
    {!loading
      ?
      <div className='experience-section-wrapper'>
        <h1>{`${experience.nombre}`}</h1>
        <p>{`${experience.descripcion}`}</p>
      </div>
      :
      <p>Cargando...</p>
    }
  </>
  );
}

export default ExperienceSection;
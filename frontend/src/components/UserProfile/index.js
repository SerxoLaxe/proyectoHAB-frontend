import { useEffect, useState } from "react";
import { useParams} from "react-router";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUserProfile from '../../hooks/useUserProfile';

const UserProfile = () => {
  const { id } = useParams();
  const [token] = useUserTokenContext();
  const [loggedUser] = useUserProfile(token);
  const [user, setUser] = useState();

  useEffect(() => {

    async function fetchSearch() {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/usuarios/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (res.ok) {
        //setError("");
        const body = await res.json();
        setUser(body.data);
      } else {
        // const error = await res.json();
        //setError(error.message);
      }
    }
    fetchSearch();
  }, [id, token])
  console.log(user);

  return (
    <div>
      <img />
      <p>Profile {`${id}`}</p>
    </div>
  );
}
export default UserProfile
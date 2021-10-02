import { useContext, useEffect, useState } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";

const useUsersPart = (id) => {
  const [token] = useContext(UserTokenContext);

  const [usersPart, setUsersPart] = useState([]);
  useEffect(() => {
    const fetchReservas = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/experiencias/${id}/reservas`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (res.ok) {
        const body = await res.json();
        setUsersPart(body.data);
      }
    };
    if (token) fetchReservas();
  }, [id, token]);

  return [usersPart, setUsersPart];
};

export default useUsersPart;

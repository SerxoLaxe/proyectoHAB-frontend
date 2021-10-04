import { useContext, useEffect, useState } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";

const useUsersPart = (id) => {
  const [token] = useContext(UserTokenContext);
  const [usersPart, setUsersPart] = useState([]);
const [loading, setLoading] = useState(true);

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
      setLoading(false)
    };
    if (token) fetchReservas();
  }, [id, token]);

  return [usersPart, loading];
};

export default useUsersPart;

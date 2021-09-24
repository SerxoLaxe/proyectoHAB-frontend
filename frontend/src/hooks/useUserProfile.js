import { useState, useEffect } from "react";
import decodeTokenData from "../helpers/decodeTokenData";

const useUserProfile = (token) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const decodedToken = decodeTokenData(token);

  useEffect(() => {
    if (token) {
      const fetchUserProfile = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/usuarios/${decodedToken.id}`,
          {
            headers: {
              token: token,
            },
          }
        );

        if (res.ok) {
          const body = await res.json();
          setUser(body.data);
        }
        setLoading(false);
      };

      fetchUserProfile();
    }
  }, [decodedToken?.id, token]);

  return [user, loading];
};

export default useUserProfile;

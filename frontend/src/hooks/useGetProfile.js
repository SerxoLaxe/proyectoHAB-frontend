import { useState, useEffect } from "react";

const useGetProfile = (id, token) => {
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usuarios/${id}`,
      {
        headers: {
          token: token,
        },
      });
      
      if (res.ok) {
        const body = await res.json();
        setUserProfile(body.data);
      }
    };

    fetchUser();
  }, [id, token]);

  return [userProfile, setUserProfile];
};

export default useGetProfile

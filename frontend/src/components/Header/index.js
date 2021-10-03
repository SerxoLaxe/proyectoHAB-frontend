import Logo from "../Logo";
import SearchBar from "../SearchBar";
import Avatar from "../Avatar";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUserProfile from "../../hooks/useUserProfile";
import { useHistory } from "react-router";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [token] = useUserTokenContext();
  const [user] = useUserProfile(token);
  const history = useHistory();
  const [userRol, setUserRol] = useState("");
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const node = useRef();

  useEffect(() => {
    if (typeof user !== "undefined" && user.length > 0) {
      setUserRol(user[0].privilegios);
    }
  }, [user]);

  const handleClickOutside = e => {
    //console.log("clicking anywhere");
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setAboutMenuOpen(false);
  };

  useEffect(() => {
    if (aboutMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutMenuOpen]);

  return (
    <div className="header">
      <Logo />
      <SearchBar />
      <div className='about-component'>
        <img className="three-dots" src="/three-dots.svg" alt="more" onClick={() => { setAboutMenuOpen(true) }} ref={node} />
        {aboutMenuOpen &&
          <div className='about-menu'>
            <p className='link' onClick={()=>{ history.push('/about')}} >
              Sobre nosotros
            </p>
            <p className='link' onClick={()=>{history.push('/terms-and-conditions')}} >
              Términos y condiciones
            </p>
          </div>}
      </div>
      {userRol === "admin" && (
        <button
          type="button"
          onClick={() => {
            history.push("/app/new-experience");
          }}
        >
          Añadir experiencia
        </button>
      )}

      {user.length > 0 ? (
        <Avatar
          avatar={user[0]?.avatar || null}
          name={user[0]?.nombre || "Jane Doe"}
          id={user[0]?.id}
          className="right-button"
          mode="menu"
        />
      ) : (
        <button
          type="button"
          className="right-button"
          onClick={() => {
            history.push(`/login`);
          }}
        >
          Iniciar sesión
        </button>
      )}
    </div>
  );
};

export default Header;

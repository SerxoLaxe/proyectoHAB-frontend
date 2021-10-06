import "./style.css";
import { useState, useRef, useEffect } from 'react'
import AvatarMenu from "../AvatarMenu";

const Avatar = ({ avatar, name, id, mode }) => {
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarMenuNode = useRef()

  const handleClickOutside = e => {
    //console.log("clicking anywhere");
    if (avatarMenuNode.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setAvatarMenuOpen(false);
  };

  useEffect(() => {
    if (avatarMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [avatarMenuOpen]);

  return (
    <div className='avatar-div' ref={avatarMenuNode} 
      onClick={() => { setAvatarMenuOpen(true); }}>
      <img
        className="avatar-img"
        src={avatar !== null ? `${process.env.REACT_APP_BACKEND_URL}/fotos/${avatar}` : '/defaultAvatar.png'}
        alt={`Avatar de ${name}`}
      />
      {(avatarMenuOpen && mode === 'menu') && <AvatarMenu userName={name} id={id} />}
    </div>
  );
};

export default Avatar;

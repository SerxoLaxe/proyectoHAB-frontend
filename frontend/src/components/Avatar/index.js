import "./style.css";
import { useState } from 'react'
import AvatarMenu from "../AvatarMenu";

const Avatar = ({ avatar, name, id }) => {
  const [avatarClicked, setAvatarClicked] = useState(false);

  return (
    <>
    <img
      className="user_avatar"
      src={`${process.env.REACT_APP_BACKEND_URL}/${avatar || "defaultAvatar.png"
        }`}
      alt={`Avatar de ${name}`}
      onClick={() => {
        avatarClicked === true
          ?
          setAvatarClicked(false)
          :
          setAvatarClicked(true);
      }}
    />
    {avatarClicked && <AvatarMenu userName={name} id={id}/>}
    </>
  );
};

export default Avatar;

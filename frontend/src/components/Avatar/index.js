import "./style.css";
import { useState } from 'react'
import AvatarMenu from "../AvatarMenu";

const Avatar = ({ avatar, name, id }) => {
  const [avatarClicked, setAvatarClicked] = useState(false);

  return (
    <div className='avatar-div'
      onMouseEnter={() => {
        setAvatarClicked(true);
      }}
      onMouseLeave={() => {
        setAvatarClicked(false);
      }}>
      <img
        className="avatar-img"
        src={`${process.env.REACT_APP_BACKEND_URL}/${avatar || "defaultAvatar.png"}`}
        alt={`Avatar de ${name}`}
      />
      {avatarClicked && <AvatarMenu userName={name} id={id} />}
    </div>
  );
};

export default Avatar;

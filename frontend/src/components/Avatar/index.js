import "./style.css";
import { useState } from 'react'
import AvatarMenu from "../AvatarMenu";

const Avatar = ({ avatar, name, id, mode }) => {
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
        src={`${process.env.REACT_APP_BACKEND_URL}/${avatar}` || `${process.env.REACT_APP_BACKEND_URL}/defaultAvatar.jpg`}
        alt={`Avatar de ${name}`}
      />
      {(avatarClicked &&  mode === 'menu') && <AvatarMenu userName={name} id={id} />}
    </div>
  );
};

export default Avatar;

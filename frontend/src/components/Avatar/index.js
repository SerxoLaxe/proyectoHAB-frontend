import "./style.css";

const Avatar = ({ avatar, name }) => {
  return (
    <img
      className="user_avatar"
      src={`${process.env.REACT_APP_BACKEND_URL}/${
        avatar || "defaultAvatar.png"
      }`}
      alt={`Avatar de ${name}`}
    />
  );
};

export default Avatar;

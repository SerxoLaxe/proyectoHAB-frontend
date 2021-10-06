import { useState } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useHistory } from "react-router-dom";
import "./style.css";

const EditUserForm = ({ id, data }) => {
  const [userName, setUserName] = useState(data.nombre);
  const [userBio, setUserBio] = useState(data.biografia);
  const [newAvatar, setNewAvatar] = useState(data.avatar ? `${process.env.REACT_APP_BACKEND_URL}/fotos/${data.avatar}` : '/defaultAvatar.png');
  const [file, setFile] = useState("");
  const [token] = useUserTokenContext();
  const history = useHistory();

  console.log(data);

  function handleAvatarChange(e) {
    const avatarFile = e.target.files[0]; // accessing file
    setNewAvatar(URL.createObjectURL(e.target.files[0]));
    console.log(avatarFile);
    setFile(avatarFile); // storing file
  }

  async function saveData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", userName);
    formData.append("biografia", userBio);
    formData.append("file", file);

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/usuarios/${data.id}`,
      {
        method: "PUT",
        headers: {
          token: token,
        },
        body: formData,
      }
    );
    if (res.ok) {
      console.log("Usuario guardado correctamente");
    }
    history.go();
  }

  return (
    <form onSubmit={saveData} className="edit-user-form">
      <label htmlFor="avatar">
        <img
          className="user-avatar"
          src={newAvatar}
          alt={`Nuevo avatar de ${data.nombre}`}
        />
      </label>
      <input
        type="file"
        id="avatar"
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => {
          handleAvatarChange(e);
        }}
      />
      <div className="profile-info-div">
        <label htmlFor='userName'>Nombre</label>
        <input
          name='userBio'
          type="text"
          placeholder={data.nombre}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label htmlFor='userBio'>Biografía</label>
        <input
          name='userBio'
          type="text"
          placeholder={data.biografia}
          onChange={(e) => {
            setUserBio(e.target.value);
          }}
        />
        <input type="submit" value="Guardar" />
      </div>
    </form>
  );
};

export default EditUserForm;

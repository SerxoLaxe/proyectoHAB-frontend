import "./style.css";
import { useState, useRef } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useHistory } from "react-router";

import FormError from "../FormError";
const CreateExperienceForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_inicial, setFecha_inicial] = useState("");
  const [fecha_final, setFecha_final] = useState("");
  const [precio, setPrecio] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [plazas_totales, setPlazas_totales] = useState("");
  const [error, setError] = useState("");
  const filesInputFotosRef = useRef();
  const [token] = useUserTokenContext();
  const [history] = useHistory();

  const createExperience = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const fotos = filesInputFotosRef.current.files;

      //para las fotos tenemos que crear un form-data
      const payload = new FormData();
      payload.append("nombre", nombre);
      payload.append("descripcion", descripcion);
      payload.append("fecha_inicial", fecha_inicial);
      payload.append("fecha_final", fecha_final);
      payload.append("precio", precio);
      payload.append("ubicacion", ubicacion);
      payload.append("plazas_totales", plazas_totales);

      for (let i = 0; i < fotos.length; i++) {
        payload.append(`foto${i}`, fotos[i]);
      }
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/experiencias`,
        {
          method: "POST",
          headers: {
            token: token,
          },
          body: payload,
        }
      );
      if (res.ok) {
        const body = await res.json();
        history.push(`/experiencias/${body.data.id}`);
      } else {
        const error = await res.json();
        throw new Error(error.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form className="form_create_experience" onSubmit={createExperience}>
        <div className="contenedor_input">
          <label htmlFor="form_experience_title">Título</label>
          <input
            id="form_experience_title"
            name="form_experience_title"
            value={nombre}
            required
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </div>
        <div className="contenedor_input">
          <label htmlFor="form_experience_descripcion">Descripción</label>
          <input
            id="form_experience_descripcion"
            name="form_experience_descripcion"
            value={descripcion}
            required
            onChange={(e) => {
              setDescripcion(e.target.value);
            }}
          />
        </div>
        <div className="contenedor_input">
          <label htmlFor="form_experience_fecha_inicial">Fecha Inicial</label>
          <input
            id="form_experience_fecha_inicial"
            name="form_experience_fecha_inicial"
            required
            type="date"
            value={fecha_inicial}
            onChange={(e) => {
              setFecha_inicial(e.target.value);
            }}
          />
        </div>
        <div className="contenedor_input">
          <label htmlFor="form_experience_fecha_final">Fecha Final</label>
          <input
            id="form_experience_fecha_final"
            name="form_experience_fecha_final"
            required
            type="date"
            value={fecha_final}
            onChange={(e) => {
              setFecha_final(e.target.value);
            }}
          />
        </div>
        <div className="contenedor_input">
          <label htmlFor="form_experience_ubicacion">Ubicacion</label>
          <input
            id="form_experience_ubicacion"
            name="form_experience_ubicacion"
            required
            value={ubicacion}
            onChange={(e) => {
              setUbicacion(e.target.value);
            }}
          />
        </div>

        <div className="contenedor_input">
          <label htmlFor="form_experience_plazas_totales">Plazas Totales</label>
          <input
            id="form_experience_plazas_totales"
            name="form_experience_plazas_totales"
            required
            value={plazas_totales}
            type="number"
            onChange={(e) => {
              setPlazas_totales(e.target.value);
            }}
          />
        </div>
        <div className="contenedor_input">
          <label htmlFor="form_experience_precio">Precio</label>
          <input
            id="form_experience_precio"
            name="form_experience_precio"
            required
            value={precio}
            type="number"
            onChange={(e) => {
              setPrecio(e.target.value);
            }}
          />
        </div>
        <input
          type="file"
          multiple
          ref={filesInputFotosRef}
          accept=".jpg,.png,.jpeg"
        />
        <input type="submit" value="Crear entrada" />
      </form>
      {error && <FormError error={error} />}
    </>
  );
};
export default CreateExperienceForm;

import "./style.css";
import { useState, useRef, useEffect } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useHistory } from "react-router";
import FormError from "../FormError";
import List from "../List";
import lodash from 'lodash';

const CreateExperienceForm = (
  {
    edit,
    id,
    name,
    description,
    startDate,
    endDate,
    price,
    location,
    totalSeats,
    pictures,
  }
) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_inicial, setFecha_inicial] = useState("");
  const [fecha_final, setFecha_final] = useState("");
  const [precio, setPrecio] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [plazas_totales, setPlazas_totales] = useState("");
  const [images, setImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [error, setError] = useState("");
  const filesInputFotosRef = useRef();
  const [token] = useUserTokenContext();
  const history = useHistory();

  useEffect(() => {
    if (edit) {
      setNombre(name);
      setDescripcion(description);
      setFecha_inicial(startDate);
      setFecha_final(endDate);
      setPrecio(price);
      setPlazas_totales(totalSeats);
      setImages(pictures);
      setUbicacion(location)
    }
  }, [
    edit,
    name,
    description,
    startDate,
    endDate,
    price,
    location,
    totalSeats,
    pictures
  ]);

  const createExperience = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const fotos = filesInputFotosRef.current.files;

      if (fotos.length > 4) {
        throw new Error("Solo se pueden escoger 4 fotos");
      }

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
        history.push(`/app/experience/${body.id}`);
      } else {
        const error = await res.json();
        throw new Error(error.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  function editExperience(e) {
    e.preventDefault();
    async function deleteFoto(id) {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiencias/imagen/${id}`,
        {
          method: 'DELETE',
          headers: {
            token: token
          }
        });
      if (!res.ok) {
        const error = await res.json();
        setError(error.messagen);
      }
    }

    async function fetchEditExperience() {
      setError("");
      const payload = new FormData();
      payload.append("nombre", nombre);
      payload.append("descripcion", descripcion);
      payload.append("fecha_inicial", fecha_inicial);
      payload.append("fecha_final", fecha_final);
      payload.append("precio", precio);
      payload.append("ubicacion", ubicacion);
      payload.append("plazas_totales", plazas_totales);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/experiencias/${id}`,
        {
          method: "PUT",
          headers: {
            token: token,
          },
          body: payload,
        }
      );
      if (res.ok) {
        history.push(`/app/experience/${id}`);
      } else {
        const error = await res.json();
        setError(error.message);
      }
    }

    async function saveImage(i, fotos) {
      const payload = new FormData();
      payload.append(`foto${i}`, fotos[i]);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/experiencias/${id}/imagen`,
        {
          method: "POST",
          headers: {
            token: token,
          },
          body: payload,
        }
      );
      if (res.ok) {
        history.push(`/app/experience/${id}`);
      } else {
        const error = await res.json();
        setError(error.message);
      }
    }
    try {
      //Eliminamos una a una las fotos que han sido seleccionadas para ser borradas.
      if (imagesToDelete.length > 0) {
        for (let i = 0; i < imagesToDelete.length; i++) {
          deleteFoto(imagesToDelete[i]);
        }
      }
      //Añadimos una a una las imágenes que han sido introducidas.
      const fotos = filesInputFotosRef.current.files;

      if (fotos.length + images.length > 4) {
        throw  new Error("máximo 4 fotos por experiencia");
      } else {
        for (let i = 0; i < fotos.length; i++) {
          saveImage(i, fotos);
        }

      }

      fetchEditExperience();
    } catch (error) {
      setError(error.message);
    }
  }

  function deleteImage(e) {
    const imageId = e.target.getAttribute('image-id');
    setImagesToDelete(imagesToDelete.concat(parseInt(imageId)));
    const filteredImages = lodash.remove(images, (element) => { return element.id !== parseInt(imageId) });
    setImages(filteredImages);
  }

  return (
    <div className='edit-experience'>
      <form className="edit-experience-form" onSubmit={!edit ? createExperience : editExperience}>
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
        {pictures.length < 4 && <input
          type="file"
          multiple
          ref={filesInputFotosRef}
          accept=".jpg,.png,.jpeg"
        />}

        <input type="submit" value={edit ? 'guardar cambios' : "crear"} />
        <button>Cancelar</button>
        {error && <FormError error={error} />}
      </form>
      
      {edit && images.length > 0 &&
        <div className='edit-experience-images'>
          <p>Hay {images.length} imagenes</p>
          <List
            data={images}
            render={(image, index) => (
              <div key={image.id}>
                <img alt='experience' src={`${process.env.REACT_APP_BACKEND_URL}/fotos/${image.thumbnail}`} />
                <button image-id={image.id} index={index} onClick={deleteImage}>Eliminar</button>
              </div>
            )}
          />
        </div>
      }
    </div>
  );
};
export default CreateExperienceForm;

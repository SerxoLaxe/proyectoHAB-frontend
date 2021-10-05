import { useParams } from "react-router";
import useExperiencia from "../../hooks/useExperiencia";
import CreateExperienceForm from "../CreateExperienciaForm";

const EditExperienceSection = () => {
  const { id } = useParams();
  const [experience, loadingExperience] = useExperiencia(id);

  if ( !loadingExperience){
    console.log(experience);
    console.log();
  }
  return (
    <div>
      {!loadingExperience
        ?
        <CreateExperienceForm 
        edit={true} 
        name={experience.nombre} 
        description={experience.descripcion}
        startDate={new Date(experience.fecha_inicial).toISOString().split('T')[0]}
        endDate={new Date(experience.fecha_final).toISOString().split('T')[0]}
        location={experience.ubicacion}
        totalSeats={experience.plazas_totales}
        price={experience.precio}
        pictures={experience.fotos}
        />
        :
        <p>Cargando</p>
        }

    </div>
  )
}

export default EditExperienceSection;
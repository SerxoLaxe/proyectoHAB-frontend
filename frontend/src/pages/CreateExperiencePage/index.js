import "./style.css";
import CreateExperienceForm from "../../components/CreateExperienciaForm";
const CreateExperiencePage = () => {
  return (
    <div className="create_experience_page">
      <h2 className="create_experience_title">Añade una experiencia</h2>
      <CreateExperienceForm edit={false}/>
    </div>
  );
};

export default CreateExperiencePage;

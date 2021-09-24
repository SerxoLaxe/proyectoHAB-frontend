import "./style.css";
import CreateExperienceForm from "../../components/CreateExperienciaForm";
import Header from "../../components/Header";
const CreateExperiencePage = () => {
  return (
    <div className="create_experience_page">
      <Header />
      <h2 className="create_experience_title">Añade una experiencia</h2>
      <CreateExperienceForm />
    </div>
  );
};

export default CreateExperiencePage;

import { useParams, useRouteMatch } from "react-router";

const UserProfile = () =>{
  const {id} = useParams();
  return (
    <div>
      <p>Profile {`${id}`}</p>
    </div>
  );
}
export default UserProfile
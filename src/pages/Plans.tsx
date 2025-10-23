import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const goToSummary = () => {
    navigate("/summary");
  };

  return (
    <div>
      <h1>Plans Page</h1>
      {user && <p>Welcome, {user.name}</p>}
      <button onClick={goToSummary}>
        Go to Summary
      </button>
    </div>
  );
};

export default Plans;

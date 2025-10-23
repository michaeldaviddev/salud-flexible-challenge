import { useNavigate } from "react-router-dom";

const Plans: React.FC = () => {
  const navigate = useNavigate();

  const goToSummary = () => {
    navigate("/summary");
  };

  return (
    <div>
      <h1>Plans Page</h1>
      <button
        onClick={goToSummary}
      >
        Go to Summary
      </button>
    </div>
  );
};

export default Plans;
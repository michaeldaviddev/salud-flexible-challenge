import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const goToPlans = () => {
    navigate("/plans");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button
        onClick={goToPlans}
      >
        Go to Plans
      </button>
    </div>
  );
};

export default Home;
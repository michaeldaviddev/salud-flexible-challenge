import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import type { User } from '../context/UserContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const goToPlans = async () => {
    try {
      const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/user.json');
      const data: User = await response.json();
      setUser(data);
      navigate("/plans");
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToPlans}>
        Go to Plans
      </button>
    </div>
  );
};

export default Home;

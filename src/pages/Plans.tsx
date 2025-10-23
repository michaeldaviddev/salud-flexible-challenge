import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';

// Define an interface for a single plan
interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selection, setSelection] = useState<string | null>(null);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);

  // Fetch plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/plans.json');
        const data = await response.json();
        setPlans(data.list);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };
    fetchPlans();
  }, []);

  // Filter plans based on selection
  useEffect(() => {
    if (!selection) {
      setFilteredPlans([]);
      return;
    }

    if (selection === 'forMe' && user) {
      const getAge = (birthDay: string): number => {
        const birthDate = new Date(birthDay);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };
      const userAge = getAge(user.birthDay);
      setFilteredPlans(plans.filter(plan => userAge < plan.age));
    } else if (selection === 'forSomeoneElse') {
      setFilteredPlans(plans);
    }
  }, [selection, plans, user]);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.value);
  };

  const goToSummary = () => {
    navigate("/summary");
  };

  return (
    <div>
      <h1>Plans Page</h1>
      {user && <p>Welcome, {user.name}</p>}

      <div>
        <label>
          <input
            type="radio"
            value="forMe"
            checked={selection === 'forMe'}
            onChange={handleSelectionChange}
          />
          Para mí
        </label>
        <label>
          <input
            type="radio"
            value="forSomeoneElse"
            checked={selection === 'forSomeoneElse'}
            onChange={handleSelectionChange}
          />
          Para alguien más
        </label>
      </div>

      <div>
        {filteredPlans.map(plan => (
          <div key={plan.name} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <h2>{plan.name}</h2>
            <p>Price: ${plan.price}</p>
            <ul>
              {plan.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
            <button>Seleccionar</button>
          </div>
        ))}
      </div>

      <button onClick={goToSummary} style={{ marginTop: '1rem' }}>
        Go to Summary
      </button>
    </div>
  );
};

export default Plans;

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import type { Plan } from '../context/UserContext';

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const { user, setSelectedPlan } = useUser();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selection, setSelection] = useState<string | null>(null);

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

  const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.value);
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    navigate("/summary");
  };

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

  // Determine which plans to show based on the current selection
  let plansToShow: Plan[] = [];
  if (selection === 'forMe' && user) {
    const userAge = getAge(user.birthDay);
    plansToShow = plans.filter(plan => userAge <= plan.age);
  } else if (selection === 'forSomeoneElse') {
    plansToShow = plans.map(plan => ({
      ...plan,
      price: plan.price * 0.95,
    }));
  }

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
        {plansToShow.map(plan => (
          <div key={plan.name} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <h2>{plan.name}</h2>
            <p>Price: ${plan.price.toFixed(2)}</p>
            <ul>
              {plan.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
            <button onClick={() => handleSelectPlan(plan)}>Seleccionar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;

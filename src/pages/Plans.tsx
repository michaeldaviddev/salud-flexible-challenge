import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import type { Plan } from '../context/UserContext';

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const { user, setSelectedPlan } = useUser();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selection, setSelection] = useState<string | null>(null);

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
      {user && <h1>{user.name} ¿Para quién deseas cotizar?</h1>}
      <p>Selecciona la opción que se ajuste más a tus necesidades.</p>

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
            <p>Costo del plan</p>
            <p>${plan.price.toFixed(2)} al mes</p>
            <ul>
              {plan.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
            <button onClick={() => handleSelectPlan(plan)}>Seleccionar Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;

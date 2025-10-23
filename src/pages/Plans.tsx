import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import type { Plan } from '../context/UserContext';
import './Plans.scss';

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
    <div className="plans">
      {user && <h1 className="plans__title">{user.name} ¿Para quién deseas cotizar?</h1>}
      <p className="plans__subtitle">Selecciona la opción que se ajuste más a tus necesidades.</p>

      <div className="plans__options">
        <label className={`plans__option ${selection === 'forMe' ? 'plans__option--active' : ''}`}>
          <input type="radio" value="forMe" checked={selection === 'forMe'} onChange={handleSelectionChange} />
          <span className="plans__option-title">Para mí</span>
          <span className="plans__option-text">Cotiza tu seguro de salud y agrega familiares si así lo deseas.</span>
        </label>

        <label className={`plans__option ${selection === 'forSomeoneElse' ? 'plans__option--active' : ''}`}>
          <input type="radio" value="forSomeoneElse" checked={selection === 'forSomeoneElse'} onChange={handleSelectionChange} />
          <span className="plans__option-title">Para alguien más</span>
          <span className="plans__option-text">Realiza una cotización para uno de tus familiares o cualquier persona.</span>
        </label>
      </div>

      <div className="plans__cards">
        {plansToShow.map((plan, idx) => (
          <div key={plan.name} className="plans__card">
            {idx === 1 && <div className="plans__badge">Plan recomendado</div>}
            <h2 className="plans__card-name">{plan.name}</h2>
            <p className="plans__card-label">COSTO DEL PLAN</p>
            <p className="plans__card-price">${plan.price.toFixed(2)} al mes</p>
            <ul className="plans__features">
              {plan.description.map((desc, i) => <li key={i}>{desc}</li>)}
            </ul>
            <button className="plans__button" onClick={() => handleSelectPlan(plan)}>Seleccionar Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
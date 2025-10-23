import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import './Summary.scss';

const Summary: React.FC = () => {
  const { user, selectedPlan } = useUser();

  if (!user || !selectedPlan) {
    return <Navigate to="/" />;
  }

  return (
    <div className="summary">
      <h1 className="summary__title">Resumen del seguro</h1>
      
      <div className="summary__card">
        <p className="summary__label">PRECIOS CALCULADOS PARA:</p>
        <div className="summary__user">
          <h2 className="summary__name">{user.name} {user.lastName}</h2>
        </div>
        
        <div className="summary__divider"></div>
        
        <div className="summary__section">
          <h3 className="summary__subtitle">Responsable de pago</h3>
          <p className="summary__text">DNI: {user.documentNumber}</p>
          <p className="summary__text">Celular: {user.phoneNumber}</p>
        </div>

        <div className="summary__section">
          <h3 className="summary__subtitle">Plan elegido</h3>
          <p className="summary__text">{selectedPlan.name}</p>
          <p className="summary__text">Costo del Plan: ${selectedPlan.price} al mes</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
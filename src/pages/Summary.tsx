import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const Summary: React.FC = () => {
  const { user, selectedPlan } = useUser();

  if (!user || !selectedPlan) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Resumen del seguro </h1>
      
      <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
        <h2>Precios calculados para:</h2>
        <h3>{user.name} {user.lastName}</h3>
      </div>
      
      <div>
        <h2>Responsable del pago</h2>
        <p>DNI: {user.documentNumber}</p>
        <p>Celular: {user.phoneNumber}</p>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
        <h2>Plan elegido</h2>
        <p>{selectedPlan.name}</p>
        <p>Costo del plan: ${selectedPlan.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Summary;

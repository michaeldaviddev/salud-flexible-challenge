import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const Summary: React.FC = () => {
  const { user, selectedPlan } = useUser();

  // If there is no user or plan selected, redirect to the home page
  if (!user || !selectedPlan) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Summary Page</h1>
      
      <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
        <h2>User Information</h2>
        <p><strong>Name:</strong> {user.name} {user.lastName}</p>
        <p><strong>Document Number:</strong> {user.documentNumber}</p>
        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
        <h2>Plan Selected</h2>
        <h3>{selectedPlan.name}</h3>
        <p><strong>Price:</strong> ${selectedPlan.price.toFixed(2)}</p>
        <h4>Description:</h4>
        <ul>
          {selectedPlan.description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Summary;

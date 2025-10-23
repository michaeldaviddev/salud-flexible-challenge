import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [documentNumber, setDocumentNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [policy1, setPolicy1] = useState(false);
  const [policy2, setPolicy2] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<string, string>> = {};
    if (!documentNumber) newErrors.documentNumber = 'Document number is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!policy1) newErrors.policy1 = 'You must accept the privacy policy';
    if (!policy2) newErrors.policy2 = 'You must accept the commercial policy';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/user.json');
      const data = await response.json();
      
      // Combine form data with fetched data and set it in the global state
      setUser({ 
        ...data, 
        documentNumber, 
        phoneNumber 
      });

      navigate("/plans");
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="documentNumber">Nro. de documento</label>
          <input
            id="documentNumber"
            type="text"
            placeholder="Nro. de documento"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
          />
          {errors.documentNumber && <p style={{ color: 'red' }}>{errors.documentNumber}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber">Celular</label>
          <input
            id="phoneNumber"
            type="text"
            placeholder="Celular"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={policy1}
              onChange={(e) => setPolicy1(e.target.checked)}
            />
            Acepto la Política de Privacidad
          </label>
          {errors.policy1 && <p style={{ color: 'red' }}>{errors.policy1}</p>}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={policy2}
              onChange={(e) => setPolicy2(e.target.checked)}
            />
            Acepto la Política de Comunicaciones Comerciales
          </label>
          {errors.policy2 && <p style={{ color: 'red' }}>{errors.policy2}</p>}
        </div>
        <button type="submit">Cotiza aquí</button>
      </form>
    </div>
  );
};

export default Home;

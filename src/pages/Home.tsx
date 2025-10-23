import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import './Home.scss';

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
    if (!validateForm()) return;

    try {
      const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/user.json');
      const data = await response.json();
      
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
    <div className="home">
      <div className="home__content">
        <div className="home__badge">Seguro Salud Flexible</div>
        <h1 className="home__title">Creado para ti y tu familia</h1>
        <p className="home__description">
          Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
        </p>

        <form className="home__form" onSubmit={handleSubmit}>
          <div className="home__input-group">
            <input
              className="home__input"
              type="text"
              placeholder="Nro. de documento"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
            />
            {errors.documentNumber && <span className="home__error">{errors.documentNumber}</span>}
          </div>

          <div className="home__input-group">
            <input
              className="home__input"
              type="text"
              placeholder="Celular"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <span className="home__error">{errors.phoneNumber}</span>}
          </div>

          <label className="home__checkbox">
            <input type="checkbox" checked={policy1} onChange={(e) => setPolicy1(e.target.checked)} />
            <span>Acepto la Política de Privacidad</span>
          </label>
          {errors.policy1 && <span className="home__error">{errors.policy1}</span>}

          <label className="home__checkbox">
            <input type="checkbox" checked={policy2} onChange={(e) => setPolicy2(e.target.checked)} />
            <span>Acepto la Política Comunicaciones Comerciales</span>
          </label>
          {errors.policy2 && <span className="home__error">{errors.policy2}</span>}

          <a href="#" className="home__link">Aplican Términos y Condiciones.</a>

          <button className="home__button" type="submit">Cotiza aquí</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
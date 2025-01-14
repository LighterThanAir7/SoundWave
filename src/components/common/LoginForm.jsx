import FormInput from "./FormInput.jsx";
import FormSocials from "./FormSocials.jsx";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import { useState } from "react";
import api from '../../backend/config/axiosConfig.js';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember_me: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/login', formData);

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        login(response.data.user, response.data.accessToken);
        navigate('/music');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="z-1">
      <form className="form form--login" onSubmit={handleSubmit}>
        {error && <div className="form__error">{error}</div>}

        <FormInput
          id="email"
          name="email"
          label="Email"
          type="text"
          placeholder="LighterThanAir"
          value={formData.email}
          onChange={handleChange}
        />

        <FormInput
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="●●●●●●●●"
          value={formData.password}
          onChange={handleChange}
        />

        <FormInput
          id="remember_me"
          name="remember_me"
          label="Remember me"
          type="checkbox"
          checked={formData.remember_me}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn--primary mb-24">
          Continue
        </button>

        <p className="text-center mb-24">or</p>

        <FormSocials/>

        <p className="form__register">Don&apos;t have an account?
          <Link to="/register" className="form__register-link">Register now</Link>
        </p>
      </form>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/constants.jsx";
import FormInput from "../../components/common/FormInput.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember_me: false
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      login(data.user, data.accessToken);
      navigate('/admin');

    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />

      <FormInput
        label="Password"
        type="password"
        placeholder="●●●●●●●●"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />

      <FormInput
        label="Remember me"
        type="checkbox"
        name="remember_me"
        checked={formData.remember_me}
        onChange={handleInputChange}
      />

      <button
        type="submit"
        className="btn btn--primary mb-24"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Continue'}
      </button>
    </form>
  );
}
import FormInput from "../../components/common/FormInput.jsx";
import {useState} from "react";
import {API_URL} from "../../config/constants.jsx";

// Use API_URL in your fetch calls


export default function AdminLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember_me: false
  });

  const handleInputChange = (e) => {
    const {name, value, type, checked} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('API URL:', API_URL); // Verify the URL is correct


    try {
      const response = await fetch(`${API_URL}/api/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message) || 'Login failed';
      }

      console.log('Login successful', data);
      // TODO: Store token and redirect to admin dashboard
    } catch (error) {
      console.error('Login error:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        type="email"
        placeholder="LighterThanAir"
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

      <button type="submit" className="btn btn--primary mb-24">Continue</button>

    </form>
  )
}
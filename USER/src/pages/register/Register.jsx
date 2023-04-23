import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../login/login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
    email: undefined,
  });

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  // handle credentials
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // create a user
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      navigate("/");
    } catch (err) {
      toast.error("Please, fill all the fields", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="register">
      <div className="lContainer">
        <img className="login__image" src="hotel.jpg" alt="" />
        <p className="login__title">Create an account</p>
        <div className="login__inputs">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="country"
            id="country"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="city"
            id="city"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="phone"
            id="phone"
            onChange={handleChange}
            className="lInput"
          />
          <button onClick={handleClick} className="lButton">
            Register
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;

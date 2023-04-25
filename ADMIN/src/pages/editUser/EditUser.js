import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../new/new.scss";

const EditUser = ({ inputs, title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data } = useFetch(`/${path}`);
  const navigate = useNavigate();

  // find the info with the id
  const pathId = location.pathname.split("/")[3];

  const [list, setList] = useState(data);
  const [user, setUser] = useState([]);
  const [info, setInfo] = useState(user);

  useEffect(() => {
    setList(data);
    const info = data.find((info) => info._id === pathId);
    setUser(info);
    // clean up
    return () => {
      setUser([]);
    };
  }, [data]);

  // change the state of the inputs
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // edit the user
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const updateUser = {
        ...info,
      };
      // check info is empty or not
      if (
        updateUser.username === "" ||
        updateUser.email === "" ||
        updateUser.password === "" ||
        updateUser.isAdmin === "" ||
        updateUser.phone === "" ||
        updateUser.city === "" ||
        updateUser.country === ""
      ) {
        toast.error("Please, fill all the inputs", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        return;
      }
      await axios.put(`/users/${pathId}`, updateUser);
      navigate("/users");
    } catch (err) {
      toast.error("Something is wrong", {
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
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {user &&
                inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      onChange={handleChange}
                      type={input.type}
                      id={input.id}
                      defaultValue={user[input.id]}
                      autoComplete="off"
                    />
                  </div>
                ))}
              <div className="formInput">
                <label>Admin</label>
                <select id="isAdmin" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <button className="btn__submit" onClick={handleClick}>
                Update
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

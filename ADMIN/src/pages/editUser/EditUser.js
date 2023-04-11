import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const EditUser = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data, loading, error } = useFetch(`/${path}`);
  const navigate = useNavigate();

  // find the info with the id
  const pathId = location.pathname.split("/")[3];

  const [list, setList] = useState(data);
  const [user, setUser] = useState([]);
  const [info, setInfo] = useState(user);

  useEffect(() => {
    setList(data);
    const info = data.find((info) => info._id === pathId);
    console.log(info);
    setUser(info);
    // clean up
    return () => {
      setUser([]);
    };
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    console.log(Object.keys(data).length === 0);
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dzttobvqm/image/upload",
        data
      );

      const updateUser = {
        ...info,
        img: uploadRes.data.url,
      };

      await axios.put(`/users/${pathId}`, updateUser);
      // redirect to the users page
      navigate("/users");
    } catch (err) {
      console.log(err);
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
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : `${user?.img}`}
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">Add Image</label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {user &&
                inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      onChange={handleChange}
                      type={input.type}
                      id={input.id}
                      defaultValue={user[input.id]}
                    />
                  </div>
                ))}
              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

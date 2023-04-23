import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/rooms");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // add new hotel
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dzttobvqm/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      info.city = info.city.toUpperCase();
      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("/hotels", newhotel);
      navigate("/hotels");
    } catch (err) {
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
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Create New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="images">
              {files ? (
                Object.values(files).map((file, i) => (
                  <div key={i}>
                    <img src={URL.createObjectURL(file)} alt="" />
                  </div>
                ))
              ) : (
                <img
                  src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  alt=""
                />
              )}
            </div>
            <form>
              <div className="formInput">
                <label htmlFor="file">Add Image</label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <p>Rooms</p>
                <div className="rooms">
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <div className="room" key={room._id}>
                          <input
                            type="checkbox"
                            id={room._id}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setRooms((prev) => [...prev, e.target.id]);
                              } else {
                                setRooms((prev) =>
                                  prev.filter((item) => item !== e.target.id)
                                );
                              }
                            }}
                          />
                          <label htmlFor={room._id}>{room.title}</label>
                        </div>
                      ))}
                </div>
              </div>
              <button className="btn__submit" onClick={handleClick}>
                Create
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;

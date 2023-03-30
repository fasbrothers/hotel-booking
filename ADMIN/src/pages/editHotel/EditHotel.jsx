import "../newHotel/newHotel.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditHotel = ({ title }) => {
  const [files, setFiles] = useState("");
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data } = useFetch(`/${path}`);
  const navigate = useNavigate();

  // find the info with the id
  const pathId = location.pathname.split("/")[3];

  const [rooms, setRooms] = useState([]);
  const [list, setList] = useState(data);
  const [hotel, setHotel] = useState([]);
  const [info, setInfo] = useState(hotel);

  const { places, loading, error } = useFetch("/rooms");

  useEffect(() => {
    setList(data);
    const info = data.find((info) => info._id === pathId);
    console.log(info);
    setHotel(info);
    // clean up
    return () => {
      setHotel([]);
    };
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };


  const handleClick = async (e) => {
    e.preventDefault();
    let list;
    try {
      if (!Object.keys(data).length === 0) {
        list = await Promise.all(
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
      }

      const updatehotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.put(`/hotels/${pathId}`, updatehotel);
      navigate("/hotels");
    } catch (err) {
      toast.error("something is wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
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
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
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
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotel && hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    defaultValue={hotel[input.id]}
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
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : places &&
                      places.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditHotel;

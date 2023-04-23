import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRoom = ({ title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data, loading } = useFetch(`/${path}`);
  const navigate = useNavigate();

  // find the info with the id
  const pathId = location.pathname.split("/")[3];

  const [list, setList] = useState(data);
  const [room, setRoom] = useState([]);
  const [info, setInfo] = useState(room);
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const { hotels } = useFetch("/hotels");

  useEffect(() => {
    setList(data);
    const info = data.find((info) => info._id === pathId);
    console.log(info);
    setRoom(info);
    // clean up
    return () => {
      setRoom([]);
    };
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRooms = (e) => {
    setRooms(e.target.value);
  };

  // edit the room
  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers =
      rooms.length > 0 && rooms.split(",").map((room) => ({ number: room }));

    try {
      await axios.put(`/rooms/${pathId}`, { ...info, roomNumbers });
      navigate("/rooms");
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
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {room &&
                roomInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      onChange={handleChange}
                      defaultValue={room[input.id]}
                    />
                  </div>
                ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea onChange={handleRooms} />
              </div>
              <div className="formInput form__hotel">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : hotels &&
                      hotels.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
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

export default EditRoom;

import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/rooms/${pathId}`, { ...info });
      navigate("/rooms");
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
                <textarea onChange={(e) => setRooms(e.target.value)} />
              </div>
              <div className="formInput">
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
              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;

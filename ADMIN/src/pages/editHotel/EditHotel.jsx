import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditHotel = ({ title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data } = useFetch(`/${path}`);
  const navigate = useNavigate();

  // find the info with the id
  const pathId = location.pathname.split("/")[3];

  const [list, setList] = useState(data);
  const [hotel, setHotel] = useState([]);
  const [info, setInfo] = useState(hotel);

  const { data: places, loading } = useFetch(`/rooms`);
  const [rooms, setRooms] = useState(places);
  const [files, setFiles] = useState("");

  useEffect(() => {
    setList(data);
    const info = data.find((info) => info._id === pathId);
    setHotel(info);
    // clean up
    return () => {
      setHotel([]);
    };
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // edit the hotel
  const handleClick = async (e) => {
    e.preventDefault();
    let uploadRes;
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dzttobvqm/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );
      console.log(list);
      const updatehotel = {
        ...info,
        rooms,
        photos: files ? list : hotel.photos,
      };

      if (
        updatehotel.price === "" ||
        updatehotel.address === "" ||
        updatehotel.name === "" ||
        updatehotel.description === "" ||
        updatehotel.city === ""
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

      await axios.put(`/hotels/${pathId}`, updatehotel);
      navigate("/hotels");
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
            <div className="images">
              {files
                ? Object.values(files).map((file, i) => (
                    <div key={i}>
                      <img src={URL.createObjectURL(file)} alt="" />
                    </div>
                  ))
                : hotel &&
                  hotel.photos?.map((im, i) => <img key={i} src={im} alt="" />)}
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

              {hotel &&
                hotelInputs.map((input) => (
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
                <div className="rooms">
                  {loading
                    ? "loading"
                    : places &&
                      places.map((room) => (
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

export default EditHotel;

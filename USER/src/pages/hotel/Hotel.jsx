import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Mousewheel } from "swiper";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Reserve from "../../components/reserve/Reserve";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import "./hotel.css";
import "swiper/css";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [openModal, setOpenModal] = useState(false);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  // handle reserve
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <Header type="list" />
        {loading ? (
          "loading"
        ) : (
          <div className="hotelContainer">
            <div className="hotelWrapper">
              <div className="hotelImages">
                <Swiper
                  modules={[Navigation, Autoplay, Mousewheel]}
                  direction={"vertical"}
                  breakpoints={{
                    0: {
                      mousewheel: false,
                    },
                    1025: {
                      direction: "vertical",
                      navigation: false,
                    },
                  }}
                  mousewheel={{
                    releaseOnEdges: true,
                  }}
                  slidesPerView={1}
                  autoplay={{ delay: 2000 }}
                  navigation
                  scrollbar={{ draggable: true }}
                >
                  {data.photos?.map((photo, i) => (
                    <SwiperSlide key={i}>
                      <div className="hotelImgWrapper" key={i}>
                        <img src={photo} alt="" className="hotelImg" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="hotelDescription">
                <div className="hotelFlex">
                  <div>
                    <p className="hotelTitle">{data.name}</p>
                    <div className="hotelAddress">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span>{data.address}</span>
                    </div>
                    <p className="hotelDistance">
                      Excellent location – {data.distance}m from center
                    </p>
                  </div>
                  <div className="hotelDetailsPrice">
                    <p>
                      <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                      nights)
                    </p>
                    <button onClick={handleClick}>Reserve Now!</button>
                  </div>
                </div>
                <div className="hotelDetails">
                  <div className="hotelDetailsTexts">
                    <p className="hotelDesc">{data.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
      </div>
      <Footer />
    </>
  );
};

export default Hotel;

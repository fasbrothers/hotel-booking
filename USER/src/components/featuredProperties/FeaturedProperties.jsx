import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,  Autoplay } from "swiper";
import "swiper/css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true");

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          <Swiper
            modules={[Navigation,Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              470: {
                slidesPerView: 1.5,
              },
              670: {
                slidesPerView: 2,
              },

              1024: {
                slidesPerView: 3,
              },
              1340: {
                slidesPerView: 4.5,
              },
              1980: {
                slidesPerView: 5,
              },
            }}
            spaceBetween={10}
            slidesPerView={4}
            autoplay={{ delay: 2000 }}
            navigation
            scrollbar={{ draggable: true }}
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="fpItem">
                  <img src={item.photos[0]} alt="" className="fpImg" />
                  <span className="fpName">{item.name}</span>
                  <span className="fpCity">{item.city}</span>
                  <span className="fpPrice">
                    Starting from ${item.cheapestPrice}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;

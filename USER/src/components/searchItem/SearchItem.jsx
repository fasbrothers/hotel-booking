import "./searchItem.css";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const SearchItem = ({ item, dates, options, id }) => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/hotels/room/${id}`);
  const handleClick = () => {
    navigate(`/hotels/${item._id}`, { state: { dates, options } });
  };
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <div className="si__left">
          <p className="siTitle">{item.name}</p>
          <span className="siDistance">{item.distance}m from city center</span>
          <span className="siDistance">Free cancellation</span>
          <div className="siDetailTexts">
            <span className="siPrice">${item.cheapestPrice}</span>
            <button className="siCheckButton" onClick={handleClick}>
              See availability
            </button>
          </div>
        </div>
        <div className="siRooms">
          <p>Available rooms</p>
          {data && data.map((room) => <div key={room._id}>{room.title}</div>)}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

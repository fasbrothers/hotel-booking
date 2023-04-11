import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import Footer from "../../components/footer/Footer";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [filterCity, setFilterCity] = useState([]);
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );
  const { data: city } = useFetch("/hotels");
  const handleClick = () => {
    reFetch();
    setFilterCity([]);
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const fetchData = (value) => {
    const filteredData = city.filter((item) => {
      return item.city.includes(value);
    });
    // filter unique city
    const unique = filteredData.filter((item, index, self) => {
      return (
        self.findIndex((t) => {
          return t.city === item.city;
        }) === index
      );
    });

    setFilterCity(unique);
  };
  const handleChange = (value) => {
    if (value === "") {
      setFilterCity([]);
    } else {
      setDestination(value);
      fetchData(value);
    }
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <p className="lsTitle">Your search</p>
              <div className="lsItem lsDestination">
                <label>Destination</label>
                <input
                  placeholder={destination}
                  type="text"
                  onChange={(e) => handleChange(e.target.value.toUpperCase())}
                />
                {filterCity.length > 0 && (
                  <div className="filterCity">
                    {filterCity.map((item, i) => (
                      <div className="filterCityItem" key={i}>{item.city}</div>
                    ))}
                  </div>
                )}
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                  dates[0].startDate,
                  "MM/dd/yyyy"
                )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.adult <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.adult}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="lsOptionItem">
                    <span className="optionText">Child</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.child <= 0}
                        className="optionCounterButton"
                        onClick={() => handleOption("child", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.child}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("child", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="lsOptionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.room <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.room}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
            <div className="listResult">
              {loading ? (
                "loading"
              ) : (
                <div>
                  <p className="listResult__hotels">
                    {data.length} search results
                  </p>
                  {data.map((item) => (
                    <SearchItem
                      id={item._id}
                      item={item}
                      key={item._id}
                      options={options}
                      dates={dates}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default List;

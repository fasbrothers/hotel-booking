import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./header.css";
import useFetch from "../../hooks/useFetch";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    child: 0,
    adult: 1,
    room: 1,
  });
  const [filterCity, setFilterCity] = useState([]);

  const { data } = useFetch("/hotels");

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  const fetchData = (value) => {
    const filteredData = data.filter((item) => {
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

  const handleSearch = () => {
    if (destination === "") {
      toast.error("Please, enter a location", {
        position: "top-center",
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
    if (dates[0].startDate === dates[0].endDate) {
      alert("Please enter a valid date range");
      return;
    }
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <h4>Book your stay with Travel</h4>
          <p>101 rooms around the Uzbekistan are waiting to you</p>
        </div>
        {type !== "list" && (
          <>
            <div className="headerSearch">
              <div className="headerSearchItem headerFilter">
                <div>
                  <FontAwesomeIcon icon={faBed} className="headerIcon" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="headerSearchInput"
                    onChange={(e) => handleChange(e.target.value.toUpperCase())}
                  />
                </div>
                {filterCity.length > 0 && (
                  <div className="filterCity">
                    {filterCity.map((item, i) => (
                      <div className="filterCityItem" key={i}>
                        {item.city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
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
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.child} child · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
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
                    <div className="optionItem">
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
                    <div className="optionItem">
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
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
                <ToastContainer />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

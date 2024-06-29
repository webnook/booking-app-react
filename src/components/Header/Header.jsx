import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();

  const searchHandler = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      options: JSON.stringify(options),
      destination,
    });
    setSearchParams(encodedParams);
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };
  const optionsHandler = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <div className="flex items-center justify-center gap-4">
     
      <div className="flex w-full max-w-[900px] items-center justify-between gap-4 border border-borderColor rounded-3xl p-4">
        <div className="flex items-center relative">
          <MdLocationOn className="w-6 h-6 inline-block text-rose500" />
          <input
            className="text-lg px-3 py-2 form-input border-none rounded-md"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go?"
            name="destination"
            id="destination"
          />
          <span className="inline-block w-[1px] h-8 text-text400 ml-2">|</span>
        </div>
        <div className="flex items-center relative">
          <HiCalendar className="w-6 h-6 inline-block text-primary700" />
          <div
            onClick={() => setOpenDate(!openDate)}
            className="ml-3 mr-3 text-sm">
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              className="absolute top-12 z-10 -left-20"
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="inline-block w-[1px] h-8 text-text400 ml-2 mx-0 my-4">
            |
          </span>
        </div>
        <div className="flex items-center relative">
          <div
            id="optionDropDown"
            onClick={() => setOpenOptions(!openOptions)}
            className="flex items-center relative">
            {options.adult} adult &bull; {options.children} children &bull;
            {options.room} room
          </div>
          {openOptions && (
            <GuestOptionsList
              options={options}
              setOpenOptions={setOpenOptions}
              optionsHandler={optionsHandler}
            />
          )}
          <span className="inline-block w-[1px] h-8 text-text400 ml-2 mx-0 my-4">
            |
          </span>
        </div>

        <div className="flex items-center relative">
          <button
            onClick={searchHandler}
            className="flex items-center justify-center bg-primary600 text-white rounded-2xl p-3">
            <HiSearch className="w-6 h-6 inline-block " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

const GuestOptionsList = ({ options, optionsHandler, setOpenOptions }) => {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div
      ref={optionsRef}
      className="bg-white shadow-md rounded-lg p-4 border border-primary100 absolute top-12 w-[220px] z-10">
      <OptionItem
        optionsHandler={optionsHandler}
        options={options}
        type="adult"
        minLimit={1}
      />
      <OptionItem
        optionsHandler={optionsHandler}
        options={options}
        type="children"
        minLimit={0}
      />
      <OptionItem
        optionsHandler={optionsHandler}
        options={options}
        type="room"
        minLimit={1}
      />
    </div>
  );
};

const OptionItem = ({ options, type, minLimit, optionsHandler }) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <span className="flex-1 text-sm inline-block">{type}</span>
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-lg bg-text100 text-text500"
          onClick={() => optionsHandler(type, "dec")}
          disabled={options[type] <= minLimit}>
          <HiMinus />
        </button>
        <span>{options[type]}</span>
        <button
          className="p-2 rounded-lg bg-text100 text-text500"
          onClick={() => optionsHandler(type, "inc")}>
          <HiPlus />
        </button>
      </div>
    </div>
  );
};

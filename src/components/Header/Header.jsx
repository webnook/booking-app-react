import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiSearch } from "react-icons/hi";
import { useState } from "react";
const Header = () => {
  const [destination, setDestination] = useState("");
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
          <div className="ml-3 mr-3 text-sm">2023/01/25</div>
          <span className="inline-block w-[1px] h-8 text-text400 ml-2 mx-0 my-4">
            |
          </span>
        </div>
        <div className="flex items-center relative">
          1 adult &bull; 2 children &bull; 1 room
          <span className="inline-block w-[1px] h-8 text-text400 ml-2 mx-0 my-4">
            |
          </span>
        </div>
        <div className="flex items-center relative">
          <button className="flex items-center justify-center bg-primary600 text-white rounded-2xl p-3">
            <HiSearch className="w-6 h-6 inline-block " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

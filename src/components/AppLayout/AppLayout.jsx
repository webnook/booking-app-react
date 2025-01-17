import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../../context/HotelProvider";

const AppLayout = () => {
  const { hotels } = useHotels();
  return (
    <div className="mt-4 flex justify-between items-stretch h-[calc(100vh-130px)]">
      <div className="w-1/3 pr-4 overflow-y-scroll">
        <Outlet />
      </div>
      <Map markerLocations={hotels} />
    </div>
  );
};

export default AppLayout;

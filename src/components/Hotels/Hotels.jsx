import { Link } from "react-router-dom";

import Loader from "../Loader/Loader";
import { useHotels } from "../../context/HotelProvider";

const Hotels = () => {
  const { isLoading, hotels, currentHotel } = useHotels();
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">Search Results ({hotels.length})</h2>
      {hotels.map((item) => (
        <Link
          key={item.id}
          to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
          <div
            className={`flex gap-4 ${
              currentHotel?.id === item.id
                ? "border-2 border-primary700 rounded-2xl"
                : ""
            }`}>
            <img
              className="w-24 h-24 rounded-2xl object-cover"
              src={item.picture_url.url}
              alt={item.name}
            />
            <div className="flex flex-col">
              <p className="mb-1">{item.smart_location}</p>
              <p className="text-text400">{item.name}</p>
              <p className="flex items-center font-medium">
                €&nbsp; {item.price} &nbsp; <span>night</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Hotels;

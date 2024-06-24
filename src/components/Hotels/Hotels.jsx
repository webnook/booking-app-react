import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  if (isLoading) <Loader />;
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">Search Results ({data.length})</h2>
      {data.map((item) => (
        <Link
          key={item.id}
          to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
          <div className="flex gap-4">
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

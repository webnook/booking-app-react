import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

const LocationList = () => {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  if (isLoading) return <Loader />;
  return (
    <div className="max-w-screen-xl mx-auto my-8">
      <h2 className="mb-8 font-bold text-2xl">NearBy Locations</h2>
      <div className="grid grid-cols-auto-fit-300 gap-8">
        {data.map((item) => (
          <div key={item.id}>
            <img
              className="w-full h-80 object-cover object-center rounded-lg mb-2"
              src={item.picture_url.url}
              alt={item.name}
            />
            <div className="mb-1">
              <p className="font-medium">{item.smart_location}</p>
              <p className="text-text400">{item.name}</p>
              <p className="flex items-center font-medium">
                €&nbsp; {item.price} &nbsp; <span>night</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;

import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { useHotels } from "../../context/HotelProvider";
import { useEffect } from "react";

const SingleHotel = () => {
  const { id } = useParams();
  const { isLoadingCurHotel, getCurrentHotel, currentHotel } = useHotels();

  useEffect(() => {
    getCurrentHotel(id);
  }, [id]);

  if (isLoadingCurHotel || !currentHotel) return <Loader />;
  return (
    <div className="flex justify-between items-stretch gap-4 max-w-screen-xl mx-8 my-auto">
      <div>
        <h2 className="text-lg mb-1">{currentHotel.name}</h2>
        <div className="mb-4">
          {currentHotel.number_of_reviews} Reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img
          className="w-full h-auto object-cover rounded-xl"
          src={currentHotel.xl_picture_url}
          alt={currentHotel.name}
        />
      </div>
    </div>
  );
};

export default SingleHotel;

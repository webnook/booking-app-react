import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarkProvider";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

const SingleBookmark = () => {
  const { id } = useParams();
  const { getBookmark, currentBookmark, isLoading } = useBookmarks();
  const navigate = useNavigate();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading || !currentBookmark) return <Loader />;
  return (
    <div>
      <button
        className="border border-text400 px-4 py-2 font-medium text-lg rounded-lg mb-2"
        onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold">{currentBookmark.cityName}</h2>
      <div className="m-2 border border-text400 rounded-2xl p-2 flex items-center ">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />{" "}
        &nbsp;
        <p>
          &nbsp; {currentBookmark.cityName} - {currentBookmark.country}
        </p>
      </div>
    </div>
  );
};

export default SingleBookmark;

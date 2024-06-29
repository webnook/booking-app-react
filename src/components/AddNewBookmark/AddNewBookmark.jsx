import { useNavigate, useSearchParams } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../../context/BookmarkProvider";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

const AddNewBookmark = () => {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = useBookmarks();

  useEffect(() => {
    if (!lat || !lng) return;
    async function getLocation() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode) throw new Error("this location is not a city");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        toast.error(error.message);
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    getLocation();
  }, [lat, lng]);

  const backHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;
    const newBookmark = {
      cityName,
      country,
      countryCode,
      host_location: cityName + " " + country,
      latitude: lat,
      longitude: lng,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };
  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError)
    return <p>this location is not a city please click somewhere else!</p>;
  return (
    <div>
      <h2 className="text-2xl font-bold">Bookmark New Location</h2>
      <form action="" onSubmit={submitHandler}>
        <div className="relative mb-4">
          <label className="mb-2 block text-lg" htmlFor="cityName">
            city name
          </label>
          <input
            className="form-input rounded-lg w-full border border-text400 p-2"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="relative mb-4">
          <label className="mb-2 block text-lg" htmlFor="country">
            country
          </label>
          <input
            className="form-input rounded-lg w-full border border-text400 p-2"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
          />
          <ReactCountryFlag
            className="absolute top-2/3  right-4"
            svg
            countryCode={countryCode}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => backHandler(e)}
            className="py-2 px-4 rounded-lg border border-text400">
            &larr; Back
          </button>
          <button className="bg-primary600 text-white py-2 px-4 rounded-lg">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookmark;

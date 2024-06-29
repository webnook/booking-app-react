import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../../context/BookmarkProvider";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

const Bookmarks = () => {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmarks();

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length)
    return <p className="font-bold text-lg">there is no bookmarked Location</p>;
  return (
    <div className="mt-4 ">
      <h2 className="font-bold text-2xl m-4">Bookmark List</h2>
      <div>
        {bookmarks.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
            <div
              className={`mb-4 border border-text400 rounded-2xl p-4 flex items-center justify-between ${
                item.id === currentBookmark?.id
                  ? "border-2 border-rose500 rounded-2xl"
                  : ""
              }`}>
              <div>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp; <strong>{item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
              </div>
              <button onClick={(e) => deleteHandler(e, item.id)}>
                <HiTrash className="text-rose500" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;

import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmarks } from "../../context/BookmarkProvider";

const BookmarkLayout = () => {
  const { bookmarks } = useBookmarks();
  return (
    <div className="mt-4 flex justify-between items-stretch h-[calc(100vh-130px)]">
      <div className="w-1/3 pr-4 overflow-y-scroll">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
};

export default BookmarkLayout;

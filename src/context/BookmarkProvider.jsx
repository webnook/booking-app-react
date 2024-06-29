import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";

const BookmarkListProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const getBookmarkList = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}`);
        setBookmarks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getBookmarkList();
  }, []);

  const getBookmark = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createBookmark = async (newBookmark) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}`, newBookmark);
      setCurrentBookmark(data);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBookmark = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        deleteBookmark,
        currentBookmark,
        createBookmark,
      }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkListProvider;

export function useBookmarks() {
  return useContext(BookmarkContext);
}

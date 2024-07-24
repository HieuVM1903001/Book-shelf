import { useEffect, useState } from "react";
import "./App.css";
import { MainPage } from "./MainPage";
import { SearchPage } from "./SearchPage";
import { Route, Routes } from "react-router-dom";
import { getAll } from "./BooksAPI";

function App() {
  const [allBooks, setAllBooks] = useState([]);

  const onShelfSelect = (value, bookData) => {
    setAllBooks((prevBooks) => {
      const newBookList = prevBooks.map((bookItem) =>
        bookItem.id === bookData.id
          ? { ...bookItem, shelf: value }
          : bookItem

      );
      localStorage.setItem("allBooks", JSON.stringify(newBookList));
      return newBookList;
    });
  };

  useEffect(() => {
    const getBooks = () => {
      const storedBooks = localStorage.getItem("allBooks");
      if (storedBooks) {
        setAllBooks(JSON.parse(storedBooks));
      } else {
        const fetchBooks = async () => {
          const books = await getAll();         
          setAllBooks(books);
          localStorage.setItem("allBooks", JSON.stringify(books));
        };
        fetchBooks();
      }
    };
    getBooks();
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<MainPage allBooks={allBooks} onShelfSelect={onShelfSelect} />}
      />
      <Route
        exact
        path="/search"
        element={
          <SearchPage listBook={allBooks} onShelfSelect={onShelfSelect} />
        }
      />
    </Routes>
  );
}

export default App;

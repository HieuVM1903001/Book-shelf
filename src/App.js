import { useEffect, useState } from "react";
import "./App.css";
import { MainPage } from "./MainPage";
import { SearchPage } from "./SearchPage";
import { Route, Routes } from "react-router-dom";
import { getAll, update } from "./BooksAPI";

function App() {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAll();
      setAllBooks(books);
    };
    fetchBooks();
  }, [allBooks]);

  return (
    <Routes>
      <Route exact path="/" element={<MainPage allBooks={allBooks} />} />
      <Route
        exact
        path="/search"
        element={<SearchPage booksOnShelf={allBooks} />}
      />
    </Routes>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Button, Input, Typography, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { BookShelf } from "./BookShelf";
import { search } from "./BooksAPI";

const { Header, Content } = Layout;
const { Title } = Typography;

export const SearchPage = ({ booksOnShelf }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [bookList, setBookList] = useState([]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchBooks = async () => {
      try {
        if (!input) {
          setBookList([]);
          return;
        }
        const books = await search(input, 100, { signal });
        if (isMounted && !books.error) {
          console.log({ books });
          const bookIDs = booksOnShelf.map((book) => book.id);
          const categorized = books.map((book) => {
            if (bookIDs.includes(book.id)) {
              return booksOnShelf.find(
                (bookOnshelf) => bookOnshelf.id === book.id
              );
            }
            return book;
          });
          setBookList(categorized);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [input]);
  const onClose = () => {
    navigate("/");
  };

  return (
    <Layout style={{ padding: "24px" }}>
      <Header style={{ backgroundColor: "#4096ff", color: "#fff" }}>
        <Button onClick={onClose} style={{ color: "#000" }}>
          Back to Main
        </Button>
      </Header>
      <Content style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
        <Title level={2}>Search Books</Title>
        <Input
          placeholder="Search by title or author"
          value={input}
          onChange={onInputChange}
          style={{ marginBottom: "24px" }}
        />
        <BookShelf category="Search Results" bookList={bookList} />
      </Content>
    </Layout>
  );
};

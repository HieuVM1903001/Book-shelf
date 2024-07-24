import { useEffect, useState } from "react";
import { Button, Input, Typography, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { BookShelf } from "./BookShelf";

const { Header, Content } = Layout;
const { Title } = Typography;

export const SearchPage = ({ listBook, onShelfSelect }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [bookList, setBookList] = useState(listBook);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (input) {
      const match = listBook.filter(
        (bookData) =>
          bookData?.title.toLowerCase().includes(input.toLowerCase()) ||
          bookData?.authors.some((author) =>
            author.toLowerCase().includes(input.toLowerCase())
          )
      );
      setBookList(match);
    } else {
      setBookList(listBook);
    }
  }, [input, listBook]);

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
        <BookShelf
          category="Search Results"
          bookList={bookList}
          onShelfSelect={onShelfSelect}
        />
      </Content>
    </Layout>
  );
};

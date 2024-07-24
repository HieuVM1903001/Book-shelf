import { Button, Layout, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { BookShelf } from "./BookShelf";
const { Header, Footer, Content } = Layout;
export const MainPage = ({ allBooks, onShelfSelect }) => {
  const navigate = useNavigate();
  const onSearchClick = () => {
    navigate("/search");
  };
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#4096ff",
  };

  const contentStyle = {
    textAlign: "center",
    minHeight: "calc(100vh - 128px)",
    padding: "24px",
    backgroundColor: "#f0f2f5",
  };

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#4096ff",
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "90%",
    maxWidth: "100%",
    margin: "24px auto",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          Main Page{"       "}
          <Button
            onClick={onSearchClick}
            type="primary"
            style={{ marginLeft: "16px" }}
          >
            Search
          </Button>
        </Header>
        <Content style={contentStyle}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <BookShelf
                category="Currently Reading"
                bookList={allBooks.filter(
                  (bookData) => bookData.shelf === "currentlyReading"
                )}
                onShelfSelect={onShelfSelect}
              />
            </Col>
            <Col span={24}>
              <BookShelf
                category="Want to Read"
                bookList={allBooks.filter(
                  (bookData) => bookData.shelf === "wantToRead"
                )}
                onShelfSelect={onShelfSelect}
              />
            </Col>
            <Col span={24}>
              <BookShelf
                category="Read"
                bookList={allBooks.filter(
                  (bookData) => bookData.shelf === "read"
                )}
                onShelfSelect={onShelfSelect}
              />
            </Col>
          </Row>
        </Content>
        <Footer style={footerStyle}></Footer>
      </Layout>
    </>
  );
};

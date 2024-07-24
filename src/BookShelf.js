import { List, Typography } from "antd";
import { BookItem } from "./BookItem";

export const BookShelf = ({ category, bookList, onShelfSelect }) => {
  return (
    <div style={{ marginBottom: "24px" }}>
      <Typography level={3} style={{ textAlign: "left", marginBottom: "16px" }}>
        {category}
      </Typography>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={bookList}
        renderItem={(item) => (
          <List.Item key={item?.id}>
            <BookItem bookData={item} onShelfSelect={onShelfSelect} />
          </List.Item>
        )}
      />
    </div>
  );
};

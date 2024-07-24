import { Card, Select, Typography, Tooltip, Image } from "antd";
import { useState } from "react";

export const BookItem = ({ bookData, onShelfSelect }) => {
  const [current, setCurrent] = useState(bookData.shelf);

  const authorsList = () => {
    return bookData?.authors?.map((author, index) => (
      <div key={index}>{author}</div>
    ));
  };

  const items = [
    {
      value: "move",
      label: "Move to...",
      disabled: true,
    },
    {
      value: "read",
      label: "Read",
    },
    {
      value: "wantToRead",
      label: "Want to Read",
    },
    {
      value: "currentlyReading",
      label: "Currently Reading",
    },
    {
      value: "none",
      label: "None",
    },
  ];

  return (
    <Card
      style={{
        width: 250,
        borderRadius: 8,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      actions={[
        <Select
          key="shelf-select"
          style={{ width: 150 }}
          options={items}
          onChange={(value) => {
            onShelfSelect(value, bookData);
            setCurrent(value);
          }}
          defaultValue={current}
          value={current}
        />,
      ]}
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <Image
          alt={bookData?.title}
          src={bookData?.imageLinks?.smallThumbnail}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "4px 4px 4px 4px",
          }}
        />
      </div>
      <Card.Meta
        title={
          <Tooltip title={bookData?.title}>
            <Typography.Text ellipsis style={{ margin: 0, width: "100%" }}>
              {bookData?.title}
            </Typography.Text>
          </Tooltip>
        }
        description={
          <div
            style={{
              height: 40,
              overflow: "hidden",
            }}
          >
            {authorsList()}
          </div>
        }
      />
    </Card>
  );
};

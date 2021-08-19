import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push(`/`);
    }
  };

  return (
    <>
      <Form inline>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products...."
          style={{ padding: "0.6em 0.35em" }}
        ></Form.Control>
      </Form>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2"
        onClick={submitHandler}
      >
        Search
      </Button>
    </>
  );
};

export default SearchBox;

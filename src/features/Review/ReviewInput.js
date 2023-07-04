import React, { useState } from "react";
import { MDBTextArea } from "mdb-react-ui-kit";
import { createReview } from "./ReviewSlice";
import { useDispatch } from "react-redux";

function ReviewInput({ id }) {
  const dispatch = useDispatch();
  const [comment, setContent] = useState("");

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      dispatch(createReview({ id, comment }));
      setContent("");
    }
  };

  return (
    <MDBTextArea
      label="Message"
      id="textAreaExample"
      rows={2}
      wrapperClass="w-100"
      value={comment}
      onChange={(event) => setContent(event.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

export default ReviewInput;

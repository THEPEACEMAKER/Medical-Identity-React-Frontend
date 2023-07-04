import React, { useState } from "react";
import { MDBTextArea } from "mdb-react-ui-kit";
import api from "../../api/api";

function ReviewInput({ id }) {
  const [comment, setContent] = useState("");

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      const response = await api.post(`/review/create/${id}/`, {
        comment,
      });
      console.log(response.data);
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

import React, { useState, useEffect } from "react";
import QuillEditor from "react-quill";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  editor: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    minHeight: "200px",
  },
};

const RichTextEditor = ({ content, onTextChange }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (content) setValue(content);
  }, [content]);

  useEffect(() => {
    onTextChange(value);
  }, [value, onTextChange]);

  return (
    <div>
      <QuillEditor
        className={styles.editor}
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default RichTextEditor;

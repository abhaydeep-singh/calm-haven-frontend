import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
// import "jodit/build/themes/dark.min.css"; 

function RichTextEditor({ onContentChange, height = 400 }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    height: height, // Set the height from props
    placeholder: "Start typing your content here...",
	// theme: "dark",
    style: {
      backgroundColor: "#fff", // White background
      color: "#000", // Black text color
    },
  };

  const handleBlur = (newContent) => {
    setContent(newContent);
    if (onContentChange) {
      onContentChange(newContent);
    }
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default RichTextEditor;

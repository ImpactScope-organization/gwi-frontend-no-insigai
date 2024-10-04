import ReactQuill from "react-quill";
import React from "react";

export const CustomReactQuill = ({ value, onChange }) => (
  <ReactQuill
    theme="snow"
    formats={['link']}
    modules = {{
      toolbar: ['link']
    }}
    value={value}
    onChange={(value) => onChange(value)}
  />
)
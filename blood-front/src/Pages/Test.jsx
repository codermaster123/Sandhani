import React, { useState } from "react";
import FormData from "form-data";
import axios from "axios";

const url = "http://localhost:3000/uploads";
 
function App() {
  const [postImage, setPostImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", "test1");

    data.append("test", postImage);

    const res = await fetch(url, {
      method: "POST",
      body: data,
    });
    const response = await res.json();
    console.log(response);
  };

  const handleFileUpload = (e) => {
    setPostImage(e.target.files[0]);
  };
  

  return (
    <div className="mt-20">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload"></label>

        <input
          type="file"
          lable="Image"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />

        <h3>Doris Wilder</h3>
        <span>Designer</span>

        <button type="submit">Submit</button>
        
      </form>
    </div>
    
  );
}
export default App;

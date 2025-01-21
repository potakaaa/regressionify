import axios from "axios";
import { error } from "console";
import { title } from "process";
import { useState } from "react";

const Homepage = () => {
  const [sheetname, setSheetname] = useState<string | null>(null);

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    console.log(file);

    const data = new FormData(); // initialize form data form shit

    data.append("file", file); //key-value pair of "file:{actual file}"
    if (sheetname !== null) {
      data.append("sheetname", sheetname); //add sheetname if there is, otherwise use default
    }

    const test = { body: "test", title: "test" };

    axios
      .post(`${import.meta.env.VITE_API_URL}upload/`, data)
      .then((response) => {
        console.log("File uploaded successfully: ", response.data);
      })
      .catch((error: any) => {
        console.error(
          "Error uploading file: ",
          error.response?.data || error.message
        );
      });
  };

  {
    /* 
    const handleSendPost = () => {
    console.log(title);
    console.log(body);
    const newPost = {
      id: data.length + 1,
      title: title,
      body: body,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}posts/`, newPost)
      .then((response) => {
        setData([...data, response.data]);
      })
      .catch((error) =>
        console.error(
          "Error creating post: ",
          error.response?.data || error.message
        )
      );
    setTitle("");
    setBody("");
  };
    */
  }

  return (
    <div
      className="w-full flex flex-col justify-center items-center
  "
    >
      Home Page
      <input
        type="file"
        accept=".xlsx, .xls, "
        required
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default Homepage;

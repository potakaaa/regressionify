import axios from "axios";
import { error } from "console";
import { title } from "process";
import { useState } from "react";

const HomePage = () => {
  const [sheetname, setSheetname] = useState<string | null>(null);

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    console.log(file);

    const data = new FormData(); // initialize form data form shit

    data.append("file", file); //key-value pair of "file:{actual file}"

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
      <select>
        <option>sheet 1</option>
        <option>sheet 2</option>
      </select>
      <select>
        <option>col 1</option>
        <option>col 2</option>
      </select>
    </div>
  );
};

export default HomePage;

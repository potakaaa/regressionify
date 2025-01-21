import axios from "axios";
import { error } from "console";
import { title } from "process";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [sheetname, setSheetname] = useState<string | null>(null);
  const [sheetList, setSheetList] = useState<string[]>([]);

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    console.log(file);

    const data = new FormData(); // initialize form data form shit

    data.append("file", file); //key-value pair of "file:{actual file}"

    axios
      .post(`${import.meta.env.VITE_API_URL}upload/`, data)
      .then((response) => {
        console.log("File uploaded successfully: ", response.data);
        setSheetList(response.data.sheetnames);
      })
      .catch((error: any) => {
        console.error(
          "Error uploading file: ",
          error.response?.data || error.message
        );
      });
  };

  useEffect(() => {
    console.log("Sheets: ", sheetList);
  }, [sheetList]);

  return (
    <div
      className="w-full flex flex-col justify-center items-center
  "
    >
      Home Page
      <input
        type="file"
        accept=".xlsx, .xls"
        required
        onChange={handleFileUpload}
      />
      <select id="sheetname">
        {sheetList.map((sheet) => (
          <option>{sheet}</option>
        ))}
      </select>
      <select>
        <option>col 1</option>
        <option>col 2</option>
      </select>
    </div>
  );
};

export default HomePage;

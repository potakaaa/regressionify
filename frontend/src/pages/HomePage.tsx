import axios from "axios";
import { error } from "console";
import { title } from "process";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [sheetname, setSheetname] = useState<string | null>(null);
  const [sheetList, setSheetList] = useState<string[]>([]);
  const [columnList, setColumnList] = useState<string[]>([]);
  const [filePath, setFilePath] = useState<string | null>(null);

  const handleFileUpload = (e: any) => {
    const uploadedFile = e.target.files[0];

    const data = new FormData(); // initialize form data form shit

    if (uploadedFile) {
      data.append("file", uploadedFile); //key-value pair of "file:{actual file}"
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}upload/`, data)
      .then((response) => {
        console.log("File uploaded successfully: ", response.data);
        setSheetList(response.data.sheetnames);
        setFilePath(response.data.file_full_path);
      })
      .catch((error: any) => {
        console.error(
          "Error uploading file: ",
          error.response?.data || error.message
        );
      });
  };

  const handleSheetSelect = (e: any) => {
    const selectedSheet = e.target.value;
    setSheetname(selectedSheet);

    const sheetSelect = {
      file_path: filePath,
      sheetname: selectedSheet,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}select_sheet/`, sheetSelect)
      .then((response) => {
        console.log("Columns retrieved successfully: ", response.data);
        setColumnList(response.data.columns);
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
    console.log("File Path: ", filePath);
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
      {sheetList.length > 0 && (
        <select
          id="sheetname"
          value={sheetname ?? ""}
          onChange={handleSheetSelect}
        >
          {sheetList.map((sheet) => (
            <option>{sheet}</option>
          ))}
        </select>
      )}
      {columnList.length > 0 && (
        <select>
          {columnList.map((sheet) => (
            <option>{sheet}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default HomePage;

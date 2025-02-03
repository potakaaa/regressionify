import DropDown from "@/components/Dropdown";
import IndependentCard from "@/components/IndependentCard";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { useEffect, useState } from "react";

const sheetNames = ["Sheet1", "Sheet2", "Sheet3"];
const dependent = ["Y1", "Y2", "Y3"];

const HomePage = () => {
  const [sheetname, setSheetname] = useState<string | null>(null);
  const [sheetList, setSheetList] = useState<string[]>([]);
  const [columnList, setColumnList] = useState<string[]>([]);
  const [filePath, setFilePath] = useState<string | null>(null);

  console.log(sheetname);
  console.log(columnList);

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

  console.log(handleFileUpload);
  console.log(handleSheetSelect);

  useEffect(() => {
    console.log("Sheets: ", sheetList);
    console.log("File Path: ", filePath);
  }, [sheetList]);

  return (
    <div
      id="homepage-container"
      className="w-full flex flex-col justify-center items-center space-y-5"
    >
      <div
        id="title-container"
        className="flex flex-col justify-center items-center"
      >
        <h1 className="font-extrabold text-4xl text-primary">REGRESSIONIFY</h1>
        <p className="font-medium w-72 px-2 text-sm text-center">
          A Statistical Tool for Mathematicians and Statisticians.
        </p>
      </div>
      <div
        id="form-container"
        className="space-y-3 w-72 flex flex-col justify-center"
      >
        <h1 className="font-extrabold text-xl text-primary">
          Worksheet Details
        </h1>
        <div
          id="sheet-name-container"
          className="w-full flex flex-row justify-between items-center"
        >
          <p className="text-sm w-32 font-medium">Reference Sheet Name</p>
          <DropDown propList={sheetNames} />
        </div>
        <div
          id="dependent-var-container"
          className="w-full flex flex-row justify-between items-center"
        >
          <p className="text-sm w-32 font-medium">Dependent Variable</p>
          <DropDown propList={dependent} />
        </div>
        <div
          id="independent-var-container"
          className="w-full flex flex-row justify-between items-center"
        >
          <p className="text-sm w-32 font-medium">Independent Variable</p>
          <IndependentCard />
        </div>
        <div id="file-upload-container" className="w-full pt-7 space-y-1">
          <Label className="text-sm font-medium ml-1">Upload Excel File</Label>
          <Input type="file" accept=".xlsx, .xls" className="text-sm" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

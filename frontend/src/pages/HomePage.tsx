import axios from "axios";

const Homepage = () => {
  const onChange = (e: any) => {
    const file = e.target.files[0];
    console.log(file);

    axios.post(`${import.meta.env.VITE_API_URL}posts/upload/`, file);
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
      <input type="file" accept=".xlsx" required />
    </div>
  );
};

export default Homepage;

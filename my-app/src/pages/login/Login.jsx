import {React, useState} from 'react'


export default function Login() {
  const [selectedFile, setSelectedFile] = useState(null)

  const fileSelectedHandler = (e) => {
    console.log(e.target.files[0].name)
  }

  const fileUploadHandler = (e) => {
      // const result = await fetch("http://localhost:9001/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(trial),
      // });
      // const parsed = await result.json();
      // setSelectedFile(null);
  }

  return (
    <>
    <input type="file" onChange={fileSelectedHandler}></input>
    <button onClick={fileUploadHandler}>Upload</button>
    </>
  )
}


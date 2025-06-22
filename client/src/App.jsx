import Home from './Home/Home'
import SheetDisplay from './SheetDisplay/SheetDisplay'
import { useState, useEffect } from 'react';
import loadingGif from "./assets/loading.gif";
import axios from 'axios';

export default function App() {
  const [file, setFile] = useState(null);

  // preload image
  useEffect(() => {
    new Image().src = loadingGif;
  }, []);

<<<<<<< HEAD
  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    handleUpload(file);
=======
  async function onChange(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("musicFile", file);
>>>>>>> 7a8d1ddc27fddf2bf1cba72203f5ab6293cf4ea9
  }

  const handleUpload = async (file) => {
    if(!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/sheet-music", 
        formData, 
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'application/xml' });
      setFile(blob);
    }
    catch(error) {
      console.error("Upload Failed:", error);
    }
  }



  

  return (
    <>
      {!file && <Home onChange={handleChange} />}
      {file && <SheetDisplay musicFile={file} midiFile={file} onChange={handleChange} loadingGif={loadingGif} />}
    </>
  )
}
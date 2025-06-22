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

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    handleUpload(file);
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
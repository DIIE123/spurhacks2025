import Home from './Home/Home'
import SheetDisplay from './SheetDisplay/SheetDisplay'
import { useState, useEffect } from 'react';
import loadingGif from "./assets/loading.gif";
import axios from 'axios';

export default function App() {
  const [inputFile, setFile] = useState(null);

    // preload image
  useEffect(() => {
    new Image().src = loadingGif;
  }, []);

  async function onChange(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("musicFile", file);
  }

  return (
    <>
      {!inputFile && <Home onChange={onChange} />}
      {inputFile && <SheetDisplay musicFile={inputFile} midiFile={"./arabesqu.mid"} onChange={onChange} loadingGif={loadingGif} />}
    </>
  )
}
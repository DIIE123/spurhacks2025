import Home from './Home/Home'
import SheetDisplay from './SheetDisplay/SheetDisplay'
import { useState, useEffect } from 'react';
import loadingGif from "./assets/loading.gif";

export default function App() {
  const [inputFile, setFile] = useState(null);

    // preload image
  useEffect(() => {
    new Image().src = loadingGif;
  }, []);

  function onChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <>
      {!inputFile && <Home onChange={onChange} />}
      {inputFile && <SheetDisplay musicFile={inputFile} midiFile={"./arabesqu.mid"} onChange={onChange} loadingGif={loadingGif} />}
    </>
  )
}
import Home from "./Home/Home";
import SheetDisplay from "./SheetDisplay/SheetDisplay";
import Loading from "./Loading/Loading";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [file, setFile] = useState(null);
  const [midiFile, setMidiFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = async (e) => {
    const inputFile = e.target.files[0];
    setLoading(true);
    setMidiFile(inputFile);
    handleUpload(inputFile);
  };

  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/sheet-music",
        formData,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/xml" });
      setFile(blob);
      setLoading(false);
    } catch (error) {
      console.error("Conversion Failed: ", error);
      setLoading(false);
      setError(true);
    }
  };

  if (error) {
    return <p>There was an error with converting the file!</p>;
  }
  if (loading) {
    return <Loading text="Converting File..." />;
  }
  if (!file) {
    return <Home onChange={handleChange} />;
  }

  return (
    <SheetDisplay
      musicFile={file}
      midiFile={midiFile}
      onChange={handleChange}
    />
  );
}

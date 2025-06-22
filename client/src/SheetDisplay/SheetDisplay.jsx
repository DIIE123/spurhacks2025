import { useEffect, useRef, useState } from "react";
import { OpenSheetMusicDisplay as OSMD } from "opensheetmusicdisplay";
import FileUpload from "../FileUpload/FileUpload";
import DownloadButton from "../DownloadButton/DownloadButton";
import MidiPlayer from "midi-player-js";
import styles from "./SheetDisplay.module.scss";

export default function SheetDisplay({ musicFile, midiFile, onChange }) {
  const osmdContainer = useRef(null);
  const osmdRef = useRef(null);
  const midiRef = useRef(null);
  const lastTickRef = useRef(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // load sheet music
  useEffect(() => {
    if (!osmdContainer.current || !musicFile || !midiFile) return;
    if (!osmdRef.current) {
      osmdRef.current = new OSMD(osmdContainer.current, {
        backend: "svg",
        drawTitle: "true",
      });
    }

    const osmd = osmdRef.current;
    osmd.clear();
    setLoading(true);

    async function load() {
      try {
        const fileData = await musicFile.text();
        await osmd.load(fileData);
        osmd.zoom = 0.7;
        osmd.render();
        // osmd.cursor.show();
        // osmd.cursor.reset();

        // const midi = await fetch(midiFile);
        // const midiArrayBuffer = await midi.arrayBuffer();
        // const midiPlayer = new MidiPlayer.Player((event) => {
        //   if (event.name === "Note on" && event.velocity > 0) {
        //     if (event.tick !== lastTickRef.current) {
        //       osmd.cursor.next();
        //       lastTickRef.current = event.tick;
        //     }
        //   }
        // });

        // midiPlayer.loadArrayBuffer(midiArrayBuffer);
        // midiRef.current = midiPlayer;
        setLoading(false);
      } catch(error) {
        console.log("Display failed: ", error);
        setLoading(false);
        setError(true);
      }
    }

    load();

    return () => {
      osmd.clear();
    };
  }, [musicFile, midiFile]);

  function handlePlay() {
    lastTickRef.current = -1;
    osmdRef.current.cursor.reset();
    osmdRef.current.cursor.show();
    midiRef.current.play();
  }

  function handleStop() {
    lastTickRef.current = -1;
    midiRef.current.stop();
    osmdRef.current.cursor.reset();
  }

  return (
    <>
      {error && <p>There was an error with loading the sheet music!</p>}
      {loading && <Loading text="Loading Sheet Music..." />}
      {/* {!loading && !error && (
        <>
          <button onClick={() => {
            osmdRef.current.cursor.next();
          }}>Next</button>
          <button onClick={handlePlay}>Play</button>
          <button onClick={handleStop}>Stop</button>
        </>
      )} */}
      {!loading && !error && (
        <div className={loading ? styles.invisible : styles.visible}>
          <h2>Sheet Music Transcribed!</h2>
          <div className={styles.row}>
            <FileUpload onChange={onChange} />
            <DownloadButton musicFile={musicFile} />
          </div>
        </div>
      )}
      <div
        className={`${loading ? styles.invisible : styles.visible} ${
          styles.display
        }`}
        ref={osmdContainer}
      ></div>
    </>
  );
}

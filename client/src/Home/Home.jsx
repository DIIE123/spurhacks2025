import styles from "./Home.module.scss";
import FileUpload from "../FileUpload/FileUpload";
import video from "/src/assets/pianoPlaying.mp4";

export default function Home({ onChange }) {
  return (
    <>
      <video autoPlay muted loop playsInline className={styles.video}>
        <source src={video} type="video/mp4" />
      </video>

      <div className={styles.content}>
        <h1 className={styles.title}>TuneScribe</h1>
        <p className={styles.subtext}>Instantly transcribe your favourite tunes, quick and easy.</p>
        <FileUpload onChange={onChange} />
      </div>
    </>
  );
}

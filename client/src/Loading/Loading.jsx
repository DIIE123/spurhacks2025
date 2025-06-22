import styles from "./Loading.module.scss";
import loadingGif from "../assets/loading.gif";

export default function Loading({ text }) {
  return (
    <div className={styles.loading}>
      <img src={loadingGif} width="150" height="150" />
      <p>{text}</p>
    </div>
  );
}

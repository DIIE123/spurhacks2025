import styles from "./DownloadButton.module.scss";

export default function DownloadButton({ musicFile }) {
  function onClick() {
    // Create download link
    const url = window.URL.createObjectURL(musicFile);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Converted Song.xml`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  }

  return <button className={styles.downloadButton} onClick={onClick}>Download</button>;
}

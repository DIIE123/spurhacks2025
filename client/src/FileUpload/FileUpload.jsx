import styles from "./FileUpload.module.scss";

export default function FileUpload({ onChange }) {
  return (
    <div>
      <label htmlFor="file" className={styles.fileButton}>Upload File</label>
      <input type="file" accept=".mid" id="file" className={styles.file} onChange={onChange} />
    </div>
    
  );
}

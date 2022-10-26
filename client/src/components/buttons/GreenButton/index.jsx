import styles from "./styles.module.css";

const GreenButton = (Props) => {
  return (
    <button type="submit" className={styles.btn}>
      {Props.text}
    </button>
  );
};

export default GreenButton;

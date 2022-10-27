import styles from "./styles.module.css";

const BlackButton = (Props) => {
  return (
    <button type="submit" className={styles.btn}>
      {Props.text}
    </button>
  );
};

export default BlackButton;

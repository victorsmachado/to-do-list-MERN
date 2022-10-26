import styles from "./styles.module.css";

const InputForm = (Props) => {
  return (
    <input
      type={Props.type}
      placeholder={Props.placeholder}
      name={Props.name}
      value={Props.value}
      onChange={Props.onChange}
      required
      className={styles.input}
    />
  );
};

export default InputForm;

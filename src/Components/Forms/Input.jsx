import styles from "./Input.module.css";

const Input = ({ label, value, error, validate, ...props }) => {
  return (
    <>
      <label className={styles.label}>
        {label}
        <input type="text" value={value} className={styles.input} {...props} />
        {error && <p className={styles.error}>{error}</p>}
      </label>
    </>
  );
};

export default Input;

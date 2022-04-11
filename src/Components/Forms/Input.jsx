import Error from "../Helper/Error";
import styles from "./Input.module.css";

const Input = ({ label, value, error, validate, ...props }) => {
  return (
    <>
      <label className={styles.label}>
        {label}
        <input type="text" value={value} className={styles.input} {...props} />
        <Error error={error} />
      </label>
    </>
  );
};

export default Input;

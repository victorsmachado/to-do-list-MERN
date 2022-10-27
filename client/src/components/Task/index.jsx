import styles from "./styles.module.css";
import { Paper, Button } from "@material-ui/core";
import "./checkbox.css";

const Task = (Props) => {
  return (
    <Paper
      id={Props.key}
      className={styles.task_container}
      style={{ backgroundColor: "#ededed" }}
    >
      <label class="form-control">
        <input
          type="checkbox"
          name="checkbox"
          checked={Props.completed}
          onClick={Props.onUpdate}
        />
      </label>

      <div className={Props.completed ? styles.line_through : styles.task}>
        {Props.task}
      </div>
      <Button
        onClick={Props.onDelete}
        color="secondary"
        className={styles.deleteButton}
        style={{ border: "solid 1px red", borderRadius: "8px" }}
      >
        Delete
      </Button>
    </Paper>
  );
};

export default Task;

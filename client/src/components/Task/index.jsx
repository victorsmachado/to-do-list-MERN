import styles from "./styles.module.css";
import { Paper, Checkbox, Button } from "@material-ui/core";

const Task = (Props) => {

    return(
    <Paper
            key={Props.id}
            className={styles.task_container}
        >
        <Checkbox
        	checked={Props.completed}
        	onClick={Props.onUpdate}
        	color="primary"
        />
        <div
            className={
            Props.completed
                ? styles.line_through
                : styles.task
            }
        >
        	{Props.task}
        </div>
        <Button
            onClick={Props.onDelete}
            color="secondary"
        >
            Delete
        </Button>
    </Paper>
)}

export default Task;
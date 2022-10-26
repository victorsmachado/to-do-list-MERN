import styles from "./styles.module.css";

const WhiteButton = (Props) => {

    return(
        <button type="button" className={styles.btn}>
							{Props.text}
						</button>
    )
}

export default WhiteButton;
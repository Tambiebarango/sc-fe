import { TextField } from "@material-ui/core";
import styles from "./text.module.css";

export default function Text(props) {
  return(
    <TextField
      css={styles.textField}
      {...props}
    />
  )
}
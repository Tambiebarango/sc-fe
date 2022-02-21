import Card from "../card/card";
import styles from "./table.module.css";

export default function Table(props) {
  const data = props.data;
  const columns = props.columns;
  const hasHeader = props.hasHeader;

  console.log(data)
  return (
    // TODO: convert to MUI
    <table className={styles.table}>
      {
        hasHeader &&
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.id}>{col.title}</th>
            ))}
          </tr>
        </thead>
      }
      <tbody>
        {data.map((team, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col.id}>
                {col.title == "Position" ? i+1 : team[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

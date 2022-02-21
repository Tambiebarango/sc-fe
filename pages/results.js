import { useEffect } from "react";
import Router from "next/router";

import Card from "../components/UI/card/card";
import Container from "../components/UI/container/container";
import Grid from "../components/UI/grid/grid";
import Table from "../components/UI/table/table";
import { TOPSCORERS } from "../data/top_scorers";

import styles from "../components/UI/table/table.module.css";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const settings = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const res = await fetch(`http://localhost:5000/results`, settings);
  if (res.status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
      props: {},
    };
  } else {
    const data = await res.json();
    const columns = [
      { id: 1, title: "Home Team", accessor: "home_team" },
      { id: 2, title: "Score", accessor: "score" },
      { id: 3, title: "Away Team", accessor: "away_team" },
    ];

    return {
      props: {
        data: data,
        columns: columns,
      },
    };
  }
}

export default function Results({ data, columns }) {
  const gws = data;
  return (
    <Container>
      <h3 style={{ marginTop: 150 + `px;` }}>RESULTS</h3>
      {gws.map(({ number, results }) => (
        <Grid>
          <h4>Gameweek {number}</h4>
          <table className={styles.table}>
            <tbody>
              {results.map((result, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.id}>{fixture[col.accessor]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      ))}
    </Container>
  );
}

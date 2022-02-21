import { useEffect } from "react";
import Router from "next/router"

import Container from "../components/UI/container/container";
import Grid from "../components/UI/grid/grid";
import Table from "../components/UI/table/table";
import { CLEANSHEETS } from "../data/cleansheets";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token
  const settings = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }
  const res = await fetch(`http://localhost:5000/users`, settings)
  if(res.status === 401){
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
      props:{},
    };
  }else{
    const data = await res.json()
    const columns = [
      {id: 1, title: "Position", accessor: "position"},
      {id: 2, title: "Username", accessor: "username"},
      {id: 3, title: "Team", accessor: "team_id"},
      {id: 4, title: "Played", accessor: "played"},
      {id: 5, title: "Cleansheets", accessor: "cleansheets"}
    ]

    return {
      props: {
        cleansheets: data,
        columns: columns
      }
    }
  }
}

export default function Cleansheet({ cleansheets, columns }) {

  return(
    <Container>
      <h3>CLEANSHEETS</h3>
      <Grid>
        <Table data={cleansheets} columns={columns}/>
      </Grid>
    </Container>
  )
}
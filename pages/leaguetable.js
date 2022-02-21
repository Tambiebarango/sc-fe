import { useEffect } from "react";
import Router from "next/router"

import Container from "../components/UI/container/container";
import Grid from "../components/UI/grid/grid";
import Table from "../components/UI/table/table";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token
  const settings = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }
  const res = await fetch(`http://localhost:5000/teams`, settings)
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
      {id: 2, title: "Name", accessor: "name"},
      {id: 3, title: "Points", accessor: "points"},
      {id: 4, title: "Played", accessor: "played"},
      {id: 5, title: "Won", accessor: "won"},
      {id: 6, title: "Drawn", accessor: "drawn"},
      {id: 7, title: "Lost", accessor: "lost"}
    ]

    return {
      props: {
        teams: data,
        columns: columns
      }
    }
  }
}

export default function Leaguetable({ teams, columns }) {
  useEffect(_ => {
    const user = localStorage.getItem("username")
    if(!user){
      Router.push("/signin")
    }
  }, []
  );

  return(
    <Container>
      <h3>LEAGUE TABLE</h3>
      <Grid>
        {/* {teams.map((team) => (
            <Link href={`/teams/${team.id}`}>
              <a>
                <Card key={team.id}>{team.name}</Card>
              </a>
            </Link>
        ))} */}
        <Table data={teams} columns={columns}/>
      </Grid>
    </Container>
  )
}
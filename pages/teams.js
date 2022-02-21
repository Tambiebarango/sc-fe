import Container from "../components/UI/container/container"
import Grid from "../components/UI/grid/grid"
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
  } else {
    const data = await res.json()
    const columns = [
      {id: 1, title: "Name", accessor: "name"}
    ]

    return {
      props: {
        teams: data,
        columns: columns
      }
    }
  }
}

export default function Teams({ teams, columns }) {
  return(
    <Container>
      <h3>TEAMS</h3>
      <Grid>
        <Table data={teams} columns={columns}/>
      </Grid>
    </Container>
  )
}
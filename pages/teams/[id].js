import { useEffect } from "react";
import Router from "next/router"

import Container from "../../components/UI/container/container";
import { getAllTeamIds, getTeamData } from "../../lib/teams";

export async function getStaticPaths() {
  const paths = getAllTeamIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const teamData = getTeamData(params.id)

  return {
    props: {
      teamData
    }
  }
}

export default function Team({ teamData }) {
  useEffect(_ => {
    const user = localStorage.getItem("username")
    if(!user){
      Router.push("/signin")
    }
  }, []
  );

  return(
    <Container>
      <h3>{teamData.data.name}</h3>
    </Container>
  )
}
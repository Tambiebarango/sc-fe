import { TEAMS } from "../data/teams";

export function getAllTeamIds() {
  // TODO: fetch request to api  
  return TEAMS.map(team => {
    return {
      params: {
        id: team.id.toString()
      }
    }
  })
}

export function getTeamData(id) {
  // TODO: fetch request to api
  // Use gray-matter to parse the post metadata section
  const data = TEAMS.find(team => team.id.toString() === id)

  // Combine the data with the id
  return {
    id,
    data
  }
}

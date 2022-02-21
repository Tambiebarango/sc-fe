export async function CheckLoggedIn(token) {
  let data = {}
  let loggedIn = false

  const settings = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }

  try {
    const fetchResponse = await fetch(`http://localhost:5000/current_user`, settings);
    data = await fetchResponse.json();
    if(!data.error){
      loggedIn = true
    }
  }catch(e){
  }
  
  return {
    loggedIn: loggedIn,
    data: data,
  };
}
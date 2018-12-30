export function getJsonData(endpoint) {
  const url = `http://localhost:4000/${endpoint}`;
  return fetch(url, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'allow',
      'x-api-key' : 'Q1GG6AytvH471DnYzeCjj5lXOwoDEZgB1REqR7vD'
    }
  })
    .then(resp => {
      const jsonResponse = resp.json();
      console.log(endpoint + ': ', jsonResponse);
      return jsonResponse;
    })
    .catch(error => console.log(error));

}
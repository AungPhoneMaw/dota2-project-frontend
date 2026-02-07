const fs = require('fs').promises;
async function getData(apiLink, fileName){
  const response = await fetch(api_link);
  const data = await response.json();
  console.log(data);
  
  //json object--> json string
  const jsonString = JSON.stringify(data, null, 2);

  // Write to the file system
  await fs.writeFile(`./${fileName}.json`, jsonString, 'utf8');
}

getData("https://api.opendota.com/api/heroes");
getData("");
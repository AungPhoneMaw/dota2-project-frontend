import axios from "axios";
import fs from 'fs';

async function getData(apiLink){
  const response = await fetch(apiLink);
  const data = await response.json();
  console.log(data);
  
  //json object--> json string
  //const jsonString = JSON.stringify(data, null, 2);

  // Write to the file system
  //await fs.writeFile(`./${fileName}.json`, jsonString, 'utf8');
}

//getData("https://api.opendota.com/api/heroes");
//getData("");

axios.get("https://api.opendota.com/api/constants/hero_abilities").then((response)=>{
  console.log(response.data["npc_dota_hero_alchemist"]["abilities"]);
}).catch((error)=>{
  console.log(error);
});

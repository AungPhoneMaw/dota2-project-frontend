import { heroData } from "./herodata.js"


const heroPagesList = [];
for (const hero of heroData) {
  heroPagesList.push(hero.name.slice(14));
};

console.log(heroPagesList);

export default heroPagesList;
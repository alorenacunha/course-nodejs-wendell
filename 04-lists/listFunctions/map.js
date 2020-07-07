const service = require("../service");

Array.prototype.myMap = function (callback) {
  const newMap = [];
  for (let index = 0; index <= this.length - 1; index++) {
    const resultado = callback(this[index], index);
    newMap.push(resultado);
  }

  return newMap;
};

async function main() {
  try {
    const results = await service.getPeople(`r`);

    const names = results.results.myMap(function (person, index) {
      return `[${index}] ${person.name}`;
    });
    console.log("names", names);
  } catch (error) {
    console.error(`DEU RUIM`, error);
  }
}
main();

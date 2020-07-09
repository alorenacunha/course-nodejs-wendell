const service = require("../service");

async function main() {
  try {
    const result = await service.getPeople("r2");
    // console.log("main -> result", result)
    const names = [];
    console.time('for measure')
    for (let i = 0; i <= result.results.length - 1; i++) {
      const person = result.results[i];
      names.push(person.name);
    }
    console.timeEnd('for measure')
    console.time('forin measure')
    for (let i in result.results) {
      const person = result.results[i];
      names.push(person.name);
    }
    console.timeEnd('forin measure')

    console.time('forof measure')
    for (person of result.results) {
      names.push(person.name);
    }
    console.timeEnd('forof measure')

    console.log(`names`, names);
  } catch (error) {
    console.error(`error interno`, error);
  }
}

main();

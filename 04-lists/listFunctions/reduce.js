const { getPeople } = require("../service");

Array.prototype.myReduce = function (callback, initial) {
  let final = typeof initial !== undefined ? initial : this[0];
  for (let index = 0; index <= this.length - 1; index++) {
    final = callback(final, this[index], this);
  }
  return final;
};

async function main() {
  try {
    const { results } = await getPeople(`r`);
    const weights = results.map((item) => parseInt(item.height));
    console.log("main -> weights", weights);

    const minhaLista = [
      ["Ou", "quei"],
      ["relou", "uourld"],
    ];
    const total = minhaLista
      .myReduce((before, next) => {
        return before.concat(next);
      }, [])
      .join(", ");
    console.log("main -> total", total);
  } catch (error) {
    console.error(`DEU RUIM`, error);
  }
}

main();

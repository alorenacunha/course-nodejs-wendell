const { getPeople } = require("../service");

Array.prototype.myFilter = function (callback) {
  const list = [];
  for (index in this) {
    const item = this[index];
    const result = callback(item, index, this);
    if (!result) continue;
    list.push(item);
  }
  return list;
};

async function main() {
  try {
    const { results } = await getPeople(`r`);

    const familiaLars = results.myFilter((item, index, list) => {
      console.log(`index: ${index}`, list.length);
      return item.name.toLowerCase().indexOf("r2") !== -1;
    });

    const names = familiaLars.map((person) => person.name);
    console.log(names);
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}
main();

const commander = require("commander");
const Hero = require("./hero");
const Database = require("./database");

(async () => {
  // cli configuration
  commander
    .version("v1")
    .option("-n, --name [value]", "add name")
    .option("-p, --power [value]", "add power")
    //CRUD
    .option("-i, --insert", "insert hero")
    .option("-r, --list [value]", "list hero by id")
    .option("-u, --update [value]", "update hero by id")
    .option("-d, --del [value]", "del hero by id")
    .parse(process.argv);

  const hero = new Hero(commander);
  try {
    if (commander.insert) {
      await Database.insert(hero);
      console.log("item inserted successfully!");
      return;
    }

    if (commander.list) {
      const id = typeof commander.list == "boolean" ? null : commander.list;
      const result = await Database.list(id);
      console.log(result);
      return;
    }

    if (commander.update) {
      const id = commander.update;
      console.log("id", id);
      await Database.update(id, hero);
      console.log("item updates successfully!");
      return;
    }

    if (commander.del) {
      const id = commander.del;
      await Database.del(id);
      console.log("item removed successfully!");
      return;
    }
  } catch (error) {
    console.error("UOOOPA", error);
    return;
  }
})();

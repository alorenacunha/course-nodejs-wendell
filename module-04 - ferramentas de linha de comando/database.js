/*
 */

const { writeFile, readFile } = require("fs");
const { promisify } = require("util");
const [writeFileAsync, readFileAsync] = [promisify(writeFile), promisify(readFile)];

class Database {
  constructor() {
    this.FILENAME = "heroes.json";
  }

  async getFile() {
    const arquivo = await readFileAsync(this.FILENAME);
    return JSON.parse(arquivo.toString());
  }

  async writeFile(dados) {
    await writeFileAsync(this.FILENAME, JSON.stringify(dados));
    return true;
  }

  async insert(hero) {
    const data = await this.getFile();
    console.log("Database -> insert -> data", data);

    const id = hero.id <= 2 ? hero.id : Date.now();
    const heroId = {
      ...hero,
      id,
    };

    return await this.writeFile([...data, heroId]);
  }

  async list(id) {
    console.log("Database -> list -> id", id);
    const data = await this.getFile();
    console.log("Database -> list -> data", data);
    //without id fetch all
    return data.filter((item) => (id ? item.id == id : true));
  }

  async update(id, updated) {
    const data = await this.getFile();
    const index = data.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw Error("heroi não existe!");
    }
    
    const oldId = data.find((item) => item.id === parseInt(id)).id;
    //retira o antigo
    const current = data[index];
    data.splice(index, 1);

    // e adiciona o novo
    const objUpdated = JSON.parse(JSON.stringify(updated));
    const dataUpdated = Object.assign({}, current, objUpdated);

    //manter id
    dataUpdated.id = oldId;
    return await this.writeFile([...data, dataUpdated]);
  }

  async del(id) {
    // se não passar id insere lista vazia
    if (!id) {
      await this.writeFile([]);
      return true;
    }

    const data = await this.getFile();

    const index = data.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw Error("heroi não existe!");
    }

    data.splice(index, 1);
    await this.writeFile(data);
    return true;
  }
}

module.exports = new Database();

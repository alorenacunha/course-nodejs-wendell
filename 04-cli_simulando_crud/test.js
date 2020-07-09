const { deepEqual, ok } = require("assert");
const Database = require("./database");
const DEFAULT_ITEM_CADASTRAR = { name: "Flash", power: "speed", id: 1 };
const DEFAULT_ITEM_ATUALIZAR = {
  name: "Lanterna Verde",
  power: "Anel do poder",
  id: 2,
};

describe("Hero manipulation", () => {
  before(async () => {
    await Database.del();
    await Database.insert(DEFAULT_ITEM_CADASTRAR);
    await Database.insert(DEFAULT_ITEM_ATUALIZAR);
  });

  it("insert hero", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    await Database.insert(DEFAULT_ITEM_CADASTRAR);

    const [realResult] = await Database.list(expected.id);
    deepEqual(realResult, expected);
  });

  it("list hero by id", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const result = await Database.list(1);
    deepEqual(result[0], expected);
  });

  it("update hero by id", async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      name: "Batman",
      power: "dim dim",
    };
    await Database.update(expected.id, {
      name: expected.name,
      power: expected.power,
    });

    const [realResult] = await Database.list(expected.id);
    deepEqual(realResult, expected);
  });
});

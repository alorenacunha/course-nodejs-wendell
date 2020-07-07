/*
 - Get user
 - Get user phont number by id
 - Get user adress by id 
*/
// import util module that supports various utilities
const util = require("util");
const getAddressAsync = util.promisify(getAddress);

function getUser() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        name: "Garibaldi",
        birthday: new Date(),
      });
    }, 1000);
  });
}

function getPhone(userId) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        phone: "1199002",
        ddd: 11,
      });
    }, 2000);
  });
}

function getAddress(userId, callback) {
  setTimeout(() => {
    return callback(null, {
      street: "dos bobos",
      number: 0,
    });
  }, 2000);
}

// async -> return promise
main();
async function main() {
  try {
    console.time("measure-promise");
    let user = await getUser();
    const result = await Promise.all([getPhone(user.id), getAddressAsync(user.id)]);
    const address = result[1];
    const phone = result[0];
    user = {
      ...user,
      address,
      phone,
    };

    console.log("main -> user", user);
    
    console.log(`
            Name: ${user.name},
            Phone: (${user.phone.ddd}) ${user.phone.phone},
            Address: ${user.address.street}, ${user.address.number}
        `);
    console.timeEnd("measure-promise");
  } catch (error) {
    console.error("error", error);
  }
}

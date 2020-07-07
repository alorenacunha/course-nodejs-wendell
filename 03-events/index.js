const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
const eventName = "user:click";
myEmitter.on(eventName, function (click) {
  console.log("a user click", click);
});

const stdin = process.openStdin();

function main() {
  return new Promise(function (resolve, reject) {
    stdin.addListener("data", function (value) {
      console.log(`value: ${value.toString().trim()}`);
      return resolve(value);
    });
  });
}
main().then(function (result) {
//   console.log("pure", result);
  console.log("written", result.toString());
});

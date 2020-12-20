const fs = require("fs");
const path = require("path");
const ping = require("ping");
const fileName = path.join(__dirname, "hosts.txt");

const fsReadFile = (fileName) => {
  return new Promise((res, rej) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) rej(err);
      res(data.split("\n"));
    });
  });
};

const cfg = {
  timeout: 10,
  // WARNING: -i 2 may not work in other platform like window
  //   extra: ["-i", "2"],
};

if (!fileName) {
  console.log(
    "The file 'hosts.txt' doesn't exit, please create it with hosts."
  );
  process.exit(1);
}

(async () => {
  let hosts = await fsReadFile(fileName);
  hosts = hosts.map((element) => element.trim("\r"));
  console.log(hosts);
  for (let host of hosts) {
    let res = await ping.promise.probe(host);
    console.log(res);
  }
})();

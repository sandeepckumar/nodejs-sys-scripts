const ping = require("ping");

var hosts = ["schenna.cotiviti.com", "rajutest.cotiviti.com", "google.com"];

const pinghost = async (hosts) => {
  try {
    for (let host of hosts) {
      let res = await ping.promise.probe(host, {
        timeout: 10,
        extra: ["-n", "2"],
      });
      console.log(res);
    }
  } catch (error) {
    throw error;
  }
};

pinghost(hosts);

// ping package is using the os ping command & need to look at icmp implementation.

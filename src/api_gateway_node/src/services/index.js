const webhook = require("./webhook");

module.exports = app => {
  app.use("/webhook", webhook);
};

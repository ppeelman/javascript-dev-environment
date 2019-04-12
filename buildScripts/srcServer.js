import express from "express";
import path from "path";
import open from "open";
import chalk from "chalk";
import webpack from "webpack";
import config from "../webpack.config";

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(
  require("webpack-dev-middleware")(compiler, {
    publicPath: config.output.publicPath
  })
);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, function(err) {
  if (err) {
    console.log(chalk.red("Something went wrong:"));
    console.log(err);
  } else {
    console.log(chalk.green("Starting app in dev mode..."));
    open("http://localhost:" + port);
  }
});

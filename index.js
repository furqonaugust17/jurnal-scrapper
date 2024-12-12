const { schoolarScrapper } = require("./services/scrapper.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", async function (req, res) {
  const { keyword } = req.body;
  const data = await schoolarScrapper(keyword);
  return res.json(data);
});

app.listen(3000);

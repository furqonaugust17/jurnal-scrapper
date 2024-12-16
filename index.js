const { schoolarScrapper, semanticSholar } = require("./services/scrapper.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", async function (req, res) {
  const { platform, keyword } = req.body;
  let result;
  switch (platform) {
    case "schoolar":
      result = await schoolarScrapper(keyword);
      break;
    case "semantic":
      result = await semanticSholar(keyword);
      break;
    default:
      break;
  }
  return res.json(result);
});

app.listen(3000);

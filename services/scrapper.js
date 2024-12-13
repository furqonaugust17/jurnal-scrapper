const cheerio = require("cheerio");
const axios = require("axios");

const schoolarScrapper = async (keyword) => {
  const url = new URL(
    "https://scholar.google.com/scholar?hl=id&as_sdt=0%2C5&q=&oq="
  );
  url.searchParams.set("q", keyword);
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const jurnalDatas = [];

    $(".gs_r.gs_or.gs_scl .gs_ri").each((index, element) => {
      const title = $(element).find("a").text();
      const link = $(element).find("a").attr("href");
      const author = $(element).find(".gs_a").text().split("-")[0];
      jurnalDatas.push({ title, link, author });
    });

    // console.log($.html());
    return jurnalDatas;
  } catch (error) {
    console.log(error);
  }
};

const crossRefScrapper = async (keyword) => {
  const url = new URL(
    "https://search.crossref.org/search/works?q=metode+jurnal&from_ui=yes"
  );
  url.searchParams.set("q", keyword);

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const jurnalDatas = [];

    $("table tr td.item-data").each((index, element) => {
      const title = $(element)
        .find(".lead")
        .text()
        .replace(/[\n\r\t]/gm, "")
        .trim();
      const link = $(element).find("a").attr("href");
      const author = $(element)
        .find(".expand")
        .text()
        .replace(/[\n\r\t]/gm, "")
        .trim()
        .replace("Authors: ", "");

      if (title != "") jurnalDatas.push({ title, link, author });
    });

    return jurnalDatas;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { schoolarScrapper, crossRefScrapper };

const cheerio = require("cheerio");
const axios = require("axios");

const schoolarScrapper = async (keyword) => {
  const url = createUrl(
    "https://scholar.google.com/scholar?hl=id&as_sdt=0%2C5&q=&oq=",
    keyword,
    "scholar"
  );
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

    return jurnalDatas;
  } catch (error) {
    console.log(error);
  }
};

const semanticSholar = async (keyword) => {
  const url = createUrl(
    "https://api.semanticscholar.org/graph/v1/paper/search",
    keyword,
    "semantic"
  );

  try {
    const {
      data: { data },
    } = await axios.get(url);
    const jurnalDatas = [];
    data.forEach((element) => {
      const title = element.title;
      const link = `https://www.semanticscholar.org/paper/${element.paperId}`;
      console.log(element.title);
      jurnalDatas.push({ title, link });
    });
    return jurnalDatas;
  } catch (error) {
    console.log(error);
  }
};

const createUrl = (url, keyword, platform) => {
  const newUrl = new URL(url);
  const { judul, start_year, end_year } = keyword;
  if (platform == "scholar") {
    newUrl.searchParams.set("q", judul);
    newUrl.searchParams.append("as_ylo", start_year);
    newUrl.searchParams.append("as_yhi", end_year);
  } else if (platform == "semantic") {
    newUrl.searchParams.set("query", judul);
    newUrl.searchParams.append("year", `${start_year}-${end_year}`);
    newUrl.searchParams.append("limit", 100);
  }

  return newUrl;
};

module.exports = { schoolarScrapper, semanticSholar };

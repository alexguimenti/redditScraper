const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request-promise");

const url = "https://www.reddit.com/"; // url desejada

async function main() {
  try {
    const html = await request.get(url);
    const $ = await cheerio.load(html);

    const titles = $(".s1okktje-0");

    titles.each((index, element) => {
      const title = $(element).text();
      console.log(title);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

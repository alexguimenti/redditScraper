const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request-promise");
const RedditArticle = require("./RedditArticle");

const url = "https://www.reddit.com/"; // url desejada

// user: redditdbuser
// password: 6UpZChiR@J9S
// db:
// mongodb+srv://redditdbuser:6UpZChiR@J9S@cluster0-cbph7.mongodb.net/test?retryWrites=true

async function connectToMongoDb() {
  await mongoose.connect(
    "mongodb+srv://redditdbuser:6UpZChiR@J9S@cluster0-cbph7.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }
  );
  console.log("Connect do Db!");
}

async function redditScrape() {
  try {
    const html = await request.get(url);
    const $ = await cheerio.load(html);

    const titles = $(".s1okktje-0");

    titles.each((index, element) => {
      const title = $(element).text();
      console.log(title);
      const redditArticle = new RedditArticle({
        title: title
      });
      redditArticle.save();
    });
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  await connectToMongoDb();
  await redditScrape();
}

main();

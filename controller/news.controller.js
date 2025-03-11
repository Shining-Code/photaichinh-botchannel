const { send2Channel } = require("../bot");
const { translate } = require("../gemini");
const NewsModel = require("../models/news.model");
const { broadcast } = require("../wsocket/websocket");

async function insertNews(news) {
  for (let i = 0; i < news.length; i++) {
    const exited = await NewsModel.findOne({ id: Number(news[i].id) });
    if (!exited) {
      delete news[i].attr_json;
      if (news[i].pub_time_tz) {
        news[i].add_time = new Date(news[i].pub_time_tz);
      } else {
        let day = news[i].pub_time.split(" ")[0];
        news[i].add_time = new Date(`${day} ${news[i].time}`);
      }

      news[i].id = Number(news[i].id);
      news[i].important = Number(news[i].important);
      if (
        news[i].influence === undefined ||
        news[i].influence === "" ||
        news[i].influence === "null"
      ) {
        news[i].influence = 0;
      } else news[i].influence = Number(news[i].influence);
      if (news[i].type === "1") {
        await NewsModel.create(news[i]);
        continue;
      }

      if (news[i].translate.length > 110) {
        const translated = await translate(news[i].content);
        news[i].translate = translated.vi;
        news[i].en = translated.en;
        news[i].vi_title = translated.vi_summary;
        news[i].en_title = translated.en_summary;
      }
      await NewsModel.create(news[i]);
      console.log(`📝 Inserted news ${news[i].id}`);
      broadcast({ type: 1, data: news[i] });
      send2Channel(news[i].translate);
    }
  }
}

module.exports = {
  insertNews,
};

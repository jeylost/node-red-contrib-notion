const { Client } = require("@notionhq/client");

module.exports = class Notion {
  constructor(notionKey) {
    this.#client = new Client({ auth: notionKey });
  }
}




const { Client, APIErrorCode } = require("@notionhq/client");
const { NotionPageSchema } = require("./schemas.js");

module.exports = class Notion {
  constructor(notionKey) {
    this.client = new Client({ auth: notionKey });
  }

  addPageToDatabase(payload) {
    const validationResult = NotionPageSchema.validate(payload);

    if (validationResult.error) {
        return { error: { type: 'validation_error', message: validationResult.error }, result: null };
    }

    return notion.pages.create(payload).catch(error => {
        return { error: { type: 'notion_api_error', message: error.code }, result: null };
    });
  }
}

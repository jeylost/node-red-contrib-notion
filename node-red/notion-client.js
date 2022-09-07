const Notion = require("../notion");

module.exports = function(RED) {
  function NotionClient(config) {
    RED.nodes.createNode(this, config);

    const NOTION_API_KEY = this.credentials.api_key;

    if (!NOTION_API_KEY) {
      throw new Error("Notion API key isn't provided. If you don't have one. Check out Notion guide https://developers.notion.com/docs/getting-started");
    }

    const flowContext = this.context();

    const notion = new Notion(NOTION_API_KEY);

    flowContext.set("notion", notion);
    
    this.log("Notion client successfully launched!");
  }

  RED.nodes.registerType("notion-client", NotionClient, {
    credentials: {
      api_key: { type: "text" }
    }
  });
}
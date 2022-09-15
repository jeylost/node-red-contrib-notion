module.exports = function(RED) {
  function NotionAddPage(config) {
    RED.nodes.createNode(this, config);

    const flowContext = this.context().flow;

    const notion = flowContext.get("notion");
    
    this.on("input", async msg => {

      const { error, result } = notion.addPageToDatabase(msg.payload);

      if (error) {
        this.log(error);
        throw error;
      }

      msg.payload = result;

      this.send(msg);
    });
    
  }

  RED.nodes.registerType("notion-add-page", NotionAddPage);
}
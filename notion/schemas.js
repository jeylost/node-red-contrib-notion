const Joi = require('joi');

const emojiReg = "/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug/";

const NotionPageSchema = Joi.object({
  parent: Joi.object({
    type: Joi.string().valid('parent_id', 'database_id').required(),
    database_id: Joi.alternatives().conditional('type', { is: 'database_id', then: Joi.string().required()}),
    page_id: Joi.alternatives('type', { is: 'parent_id', then: Joi.string().required()}),
  }).required(),

  cover: Joi.object({
    type: Joi.string().valid('external').required(),
    external: Joi.object({
      url: Joi.string().url().required(),
    }),
  }),
  
  icon: Joi.object({
    type: Joi.string().valid('emoji').required(),
    emoji: Joi.string().pattern(emojiReg).required(),
  }),

  // It's too complicated to validate properties. Check out official documentation @url https://developers.notion.com/reference/property-object
  properties: Joi.object().required(),
});

module.exports = {
  NotionPageSchema,
}

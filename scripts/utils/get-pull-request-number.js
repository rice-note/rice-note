const getPullRequest = require('./get-pull-request');

module.exports = async (client) => {
  const pr = await getPullRequest(client);
  return pr.number;
};

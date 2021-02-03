const {context} = require('@actions/github');

module.exports = async (client) => {
  const githubPayload = context.payload;
  const repository = githubPayload.repository;
  const owner = repository.owner.login;

  const result = await client.pulls.list({
    owner,
    repo: repository.name,
    state: 'open',
    head: `${owner}:${githubPayload.ref}`,
    per_page: 10,
  });

  if (!result || !result.data) {
    return null;
  }

  return result.data[0];
};

const {context} = require('@actions/github');

module.exports = async (client) => {
  const payload = context.payload;
  const owner = payload.repository.owner.login;

  const result = await client.pulls.list({
    owner,
    repo: payload.repository.name,
    state: 'open',
    head: `${owner}:${payload.ref}`,
    per_page: 100,
  });

  if (!result || !result.data) {
    return null;
  }

  return result.data[0];
};

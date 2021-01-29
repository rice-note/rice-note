const {context} = require('@actions/github');

const DEMOBOX_COMMENT_PREFIX = '<!-- private -->\r\n demobox:';
const GITHUB_ACTION_BOT = 'github-actions[bot]';

module.exports = async function (demoboxName, pullRequest, client) {
  const listCommentsResponse = await client.issues.listComments({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    issue_number: pullRequest.number,
  });

  const listComments = listCommentsResponse.data;

  const existComments = listComments.filter(
    (item) =>
      item.user.login === GITHUB_ACTION_BOT &&
      item.body.includes(DEMOBOX_COMMENT_PREFIX),
  );

  const body =
    DEMOBOX_COMMENT_PREFIX +
    'https://rice-note-app.oss-cn-hongkong.aliyuncs.com/' +
    demoboxName;

  if (existComments.length) {
    client.issues.updateComment({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      body,
      comment_id: existComments[0].id,
    });
  } else {
    await client.issues.createComment({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      issue_number: pullRequest.number,
      body,
    });
  }
};

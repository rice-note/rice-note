const core = require('@actions/core');
const {context, getOctokit} = require('@actions/github');
const dayjs = require('dayjs');
const buildDmg = require('./build-dmg');
const uploadDmg = require('./upload-dmg-oss');
const getPullRequest = require('./get-pull-request');
const createComment = require('./create-comment');

async function run() {
  const githubToken = process.env.GITHUB_TOKEN;
  const client = getOctokit(githubToken);

  const pullRequest = await getPullRequest(client);

  if (!pullRequest) {
    core.warning('No corresponding pull request found');
  }

  if (!pullRequest.labels.includes('demobox')) {
    core.info('You need to add the `demobox` label before the build will take');
  }

  const prefix = dayjs().format('MMDDHHmm');
  const author = pullRequest.user.login;
  const prNumber = pullRequest.number;

  const demoboxName =
    [context.payload.inputs.ctiName, prefix, author, prNumber].join('-') +
    '.dmg';

  await buildDmg();
  await uploadDmg(demoboxName);
  await createComment(demoboxName, pullRequest, client);
}

run();

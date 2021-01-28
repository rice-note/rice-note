const core = require('@actions/core');
const github = require('@actions/github');

const matchMap = {
  'demobox:true': 'demobox',
};

async function run() {
  const githubToken = process.env.GITHUB_TOKEN;

  const prNumber = getPrNumber();
  if (!prNumber) {
    core.setFailed('Could not get pull request number from context');
    return;
  }

  const labels = getLabels();
  if (!labels) {
    console.log('labels is undefined');
    return;
  }

  const matchLabels = isMatch();
  if (!matchLabels) {
    return;
  }

  const newLabels = matchLabels.filter((label) => !labels.includes(label));

  const client = new github.getOctokit(githubToken);

  if (!newLabels.length) {
    return;
  }
  addLabels(client, prNumber, [...labels, ...newLabels]);
}

function isMatch() {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest || !pullRequest.body) {
    return false;
  }

  return Object.keys(matchMap)
    .map((item) => {
      console.log(pullRequest.body);
      console.log(item);
      return pullRequest.body.includes(item) ? matchMap[item] : undefined;
    })
    .filter(Boolean);
}

function getLabels() {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return;
  }
  return pullRequest.labels;
}

function getPrNumber() {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return;
  }
  return pullRequest.number;
}

function addLabels(client, prNumber, labels) {
  return client.issues.addLabels({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: prNumber,
    labels: labels,
  });
}

run();

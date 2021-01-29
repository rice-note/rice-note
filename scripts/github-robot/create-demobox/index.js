const core = require('@actions/core');
const {context} = require('@actions/github');
const buildDmg = require('./build-dmg');
const uploadDmg = require('./upload-dmg-oss');

async function run() {
  const prPayload = context.payload.pull_request;
  if (!prPayload.labels.includes('demobox')) {
    core.info('You need to add the `demobox` label before the build will take');
  }

  await buildDmg();
  await uploadDmg();
}

run();

const OSS = require('ali-oss');
const {context} = require('@actions/github');
const dayjs = require('dayjs');
const pkgDir = require('pkg-dir');
const path = require('path');

module.exports = async () => {
  const projectPath = await pkgDir(__dirname);
  const {OSS_ACCESSKEYID, OSS_ACCESSKEYSECRET} = process.env;
  const sourcePath = path.join(projectPath, 'build/rice-note.dmg');

  const store = new OSS({
    region: 'oss-cn-hongkong',
    accessKeyId: OSS_ACCESSKEYID,
    accessKeySecret: OSS_ACCESSKEYSECRET,
    bucket: 'rice-note-app',
  });

  if (!context.payload.pull_request) {
    throw new Error(
      "Can't get pull_request payload. Check you trigger pull_request event",
    );
  }

  const prefix = dayjs().format('MMDDHHmm');
  const author = context.payload.pull_request.user.login;
  const prNumber = context.payload.pull_request.number;

  return store.put([prefix, author, prNumber].join('-') + '.dmg', sourcePath);
};

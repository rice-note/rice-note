const OSS = require('ali-oss');
const {context} = require('@actions/github');

const pkgDir = require('pkg-dir');
const path = require('path');

module.exports = async (demoboxName) => {
  const projectPath = await pkgDir(__dirname);
  const {OSS_ACCESSKEYID, OSS_ACCESSKEYSECRET} = process.env;
  const sourcePath = path.join(projectPath, 'build/rice-note.dmg');

  const store = new OSS({
    region: 'oss-cn-hongkong',
    accessKeyId: OSS_ACCESSKEYID,
    accessKeySecret: OSS_ACCESSKEYSECRET,
    bucket: 'rice-note-app',
  });

  return store.put(demoboxName, sourcePath);
};

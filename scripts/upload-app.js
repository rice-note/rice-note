/* eslint-disable no-undef */
const OSS = require('ali-oss');
const fs = require('fs');
const path = require('path');
const appdmg = require('appdmg');

const {OSS_ACCESSKEYID, OSS_ACCESSKEYSECRET} = process.env;

const store = new OSS({
  region: 'oss-cn-hongkong',
  accessKeyId: OSS_ACCESSKEYID,
  accessKeySecret: OSS_ACCESSKEYSECRET,
  bucket: 'rice-note-app',
});

async function uploadApp() {
  const riceNoteAppPath = path.join(__dirname, '../build/rice-note.app');
  await fs.promises.access(riceNoteAppPath);

  const dmgResult = appdmg({
    basepath: __dirname,
    specification: {
      title: '饭记',
      contents: [
        {x: 448, y: 344, type: 'link', path: '/Applications'},
        {x: 192, y: 344, type: 'file', path: '../../build/rice-note.app'},
      ],
    },
    target: path.join(__dirname, '../build/rice-note.dmg'),
  });

  let $resolve, $reject;

  dmgResult.on('finish', (rst) => {
    console.log('rst', rst);
    $resolve(rst);
  });

  dmgResult.on('error', function (error) {
    console.log('error', error);
    $reject(error);
  });

  await new Promise((resolve, reject) => {
    $reject = reject;
    $resolve = resolve;
  });

  const result = await store.put('test.app', riceNoteAppPath);
  console.log('result', result);
}

uploadApp();

const fs = require('fs');
const path = require('path');
const appdmg = require('appdmg');
const pkgDir = require('pkg-dir');

module.exports = async () => {
  const projectPath = await pkgDir(__dirname);

  const appConfig = require(path.join(projectPath, 'app.json'));
  const sourcePath = path.join(projectPath, 'build/rice-note.app');
  try {
    await fs.promises.access(sourcePath);
  } catch (error) {
    throw new Error(
      `The app has not been built successfully, please check if the app is built via fastlane. \n here is the path of the app: ${sourcePath}`,
    );
  }

  const targetPath = path.join(projectPath, 'build/rice-note.dmg');

  try {
    await fs.promises.access(targetPath);
    await fs.promises.rm(targetPath);
  } catch (error) {
    //
  }

  await new Promise((resolve, reject) => {
    appdmg({
      target: targetPath,
      basepath: __dirname,
      specification: {
        title: appConfig.displayName,
        contents: [
          {x: 448, y: 344, type: 'link', path: '/Applications'},
          {
            x: 192,
            y: 344,
            type: 'file',
            path: path.join(projectPath, 'build/rice-note.app'),
          },
        ],
      },
    })
      .on('error', reject)
      .on('finish', resolve);
  });
};

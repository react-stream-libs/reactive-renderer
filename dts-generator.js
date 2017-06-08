var dtsGen = require('dts-generator').default;
const path = require('path');
const _ = require('lodash');


function convertImportPath(params) {
  let toImportFilePath = params.importedModuleId;
  let currentFilePath = params.currentModuleId;
  if (!toImportFilePath.startsWith('.')) {
    return toImportFilePath;
  }
  if (toImportFilePath.endsWith('index')) {
    toImportFilePath = toImportFilePath.substr(0, toImportFilePath.length - 5);
  }
  const currentFilePathSplit = _.split(currentFilePath, '/');
  const currentDirPath = _.dropRight(currentFilePathSplit).join('/');

  toImportFilePath = toImportFilePath === '' ?
    'reactive-renderer'
     : path.join('reactive-renderer/lib', currentDirPath, toImportFilePath);
  // console.error('convertImportPath:: ' + params.currentModuleId + ' || ' + params.importedModuleId + '  ::  ' + toImportFilePath);
  return toImportFilePath;
}

function convertFilePath(params) {
  let filePath = params.currentModuleId;
  if (filePath === 'index') {
    return 'reactive-renderer';
  }
  filePath = 'reactive-renderer/lib/' + filePath;
  if (filePath.endsWith('index')) {
    filePath = filePath.substr(0, filePath.length - 6);
  }
  // console.error('convertFilePath:: ' + params.currentModuleId + '  ::  ' + filePath);
  return filePath;
}

dtsGen({
  name: 'reactive-renderer',
  project: 'tsconfig.lib.json',
  out: 'reactive-renderer.d.ts',
  resolveModuleId: convertFilePath,
  resolveModuleImport: convertImportPath,
});
import dtsGen from 'dts-generator'
// import dtsGen = require('dts-generator').default
// import * as dtsGen from 'dts-generator'
// var dtsGen = require('dts-generator').default;
const path = require('path');
const _ = require('lodash');


function convertImportPath(params: dtsGen.ResolveModuleImportParams) {
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
     : path.join('reactive-renderer/lib/', currentDirPath, toImportFilePath);
  console.error('convertImportPath:: ' + params.currentModuleId + ' || ' + params.importedModuleId + '  ::  ' + toImportFilePath);
  return toImportFilePath;
}

function convertFilePath(params: dtsGen.ResolveModuleIdParams) {
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

console.log('dtsGen:', dtsGen)
dtsGen({
  main: '',
  name: '',
  project: 'tsconfig.lib.json',
  out: 'reactive-renderer.d.ts',
  resolveModuleId: convertFilePath,
  resolveModuleImport: convertImportPath,
});
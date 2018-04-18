const child_process = require('child_process')
const package = require('../../package.json')

const Table = require('cli-table2')
const logger = require('../../ext/build/lib/Logger2')('ufp-show-used-packages')
const fs = require('fs');
const notMatchFolders = /node_modules/
const matchFile = /.*\.(json|js|ts|yml)/
const stripper = [
    'eslint-plugin',
    'babel-plugin',

]

const files = {}

const isString = (x) => {
    if (typeof x === 'string' || x instanceof String)
        return true
    else
        return false
}

const stringwordcount = (searchWord, searchString) => {
    var count = 0
    var wordsArray = searchString.split(/\s+/);

    wordsArray.forEach(function (key) {
        if (key.search(searchWord) != -1) {
            count += 1
        }
    })
    return count
}
const checkIfFileContains = ({searchPackageName, path}) => {

    // console.log('checkIfFileContains1', searchPackageName, path)
    if (matchFile.test(path)) {

        // console.log('checkIfFileContains2', files)
        // notmatch condition matches return noooooo
        if (!isString(files[path])) {
            // console.log('INITIALISING', path)
            const res = fs.readFileSync(path).toString()
            files[path] = res
        }
        // console.log('CONTENT OF ', path)
        //  console.log('CONTENT OF ', res)

        res = stringwordcount(searchPackageName, files[path])
        stripper.map((item) => {

            res += stringwordcount(searchPackageName.replace(item, ''), files[path])
        })
        return res
    }

    return 0
}
const iterateFolderForUsage = ({searchPackageName, path}) => {
    var counte = 0
    const files = []
    if (notMatchFolders.test(path)) {
        // notmatch condition matches return noooooo
        return {
            counts: counte,
            files
        }
    }
    // console.log('iterateFolderForUsage ', searchPackageName, path)

    const dirs = fs.readdirSync(path)
    //console.log(dirs)
    dirs.forEach((dirEntryX) => {
        const dirEntry = path + '/' + dirEntryX
        //  console.log(`::${dirEntry}`)
        //  console.log(`::${dirEntry}`)
        const stats = fs.lstatSync(dirEntry)

        if (stats.isDirectory()) {

            const tee = iterateFolderForUsage({
                searchPackageName,
                path: dirEntry
            })
            counte += tee.counts
            files.concat(tee.matchingFiles)

        } else if (stats.isFile()) {
            const tesi = checkIfFileContains({
                path: dirEntry,
                searchPackageName
            })
            if (tesi > 0) {
                files.push(dirEntry.replace(process.cwd(), ''))
                counte = counte + tesi
            }
        }

    })
    // console.log(`x ${path} ${searchPackageName} ${counte}`)

    return {
        counts: counte,
        matchingFiles: files
    }
}
// my-module.js
exports.command = ['dacd', 'dev-add-core-dependencies']

exports.describe = 'DEV - makes all dependencies of ufp-core a dev-dependency in current '

exports.builder = {}
function compareCountsAtIndex0(a, b) {
    if (a[0] > b[0])
        return -1;
    if (a[0] < b[0])
        return 1;
    return 0;
}
exports.handler = function (argv) {

    console.warn('Transforming ufp-core dependencies to current package...')

    child_process.execSync(`node ${path.join(__dirname, '../../ext/')}UpdatePackageJsonScripts.js`, {
        cwd: process.cwd(),
        stdio: 'inherit'
    })
}

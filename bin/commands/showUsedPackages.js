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
exports.command = ['sp', 'showpackages']

exports.describe = 'show npm package description of used packages'

exports.builder = {}
function compareCountsAtIndex0(a, b) {
    if (a[0] > b[0])
        return -1;
    if (a[0] < b[0])
        return 1;
    return 0;
}
exports.handler = function (argv) {

    console.log('Collecting package occurences...')

    const localPackage = require(process.cwd() + '/package.json')
    // do something with argv.
    // console.log('jo', package.scripts['ufp-start'])
    if (localPackage) {
        const tempArray = []
        const table = new Table({
            head: ['#', 'module', 'version', 'description'],
            colWidths: [5, 25, 15, 40],
            wordWrap: true
        })

        Object.keys(localPackage.dependencies).forEach((dependency) => {

                var table2 = new Table();
                // check for containing files e.g
                // const dirs = fs.readdirSync(process.cwd())
                // console.log(dirs)
                const countWith = iterateFolderForUsage({
                    path: process.cwd(),
                    searchPackageName: dependency
                })

                // reduce 1 for the entry in package.json
                const count = countWith

                // console.log(`> ${dependency} ${localPackage.dependencies[dependency]} ${count} occurences`)

                const packageJson = require(`${process.cwd()}/node_modules/${dependency}/package.json`)

                tempArray.push([count.counts - 1, dependency, localPackage.dependencies[dependency],  packageJson.description

                ])

                //console.log(table2.toString());
            }
        )
        tempArray.sort(compareCountsAtIndex0).forEach(item => table.push(item))
        console.log(table.toString());
    }

}

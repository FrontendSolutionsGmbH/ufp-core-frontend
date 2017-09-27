## Ufp Script Commands

ufp uses npm script block to define shortcuts for common project functions

## Installing/Updating project package.json

although each command can be called using the complete node_modules path it is
recommendet to import the script commands into the current project, which is done
using the following command

        node node_modules/ufp-core/ext/UpdatePackageJson

after that it can be triggered again - e.g. in case of core updates - using

        npm run ufp-update


### Reference

#### ufp-update

this command refreshes the ufp-* commands provided by ufp-core

       npm run ufp-update

for manual triggering and reference, this command is executed

       node node_modules/ufp-core/ext/UpdatePackageJson

#### ufp-make

this command triggers a complete build of the project using the following parameters:

    UFP_VERSION
    UFP_API_TYPE
    UFP_THEM,
    UFP_NODE_ENV

 "ufp-make": "npm install && node node_modules/ufp-core/ext/build/scripts/make",

    "ufp-install": "npm install && node node_modules/ufp-core/ext/Install",
    "ufp-update": "node node_modules/ufp-core/ext/UpdatePackageJson",
    "ufp-start": "cross-env NODE_ENV=development node node_modules/ufp-core/ext/build/scripts/start",
    "ufp-compile": "cross-env NODE_ENV=production node node_modules/ufp-core/ext/build/scripts/compile",
    "ufp-compile:dev": "cross-env NODE_ENV=development node node_modules/ufp-core/ext/build/scripts/compile",
    "ufp-compile:bare": "node node_modules/ufp-core/ext/build/scripts/compile",
    "webpack": "node build/scripts/compile",
    "ufp-lint": "eslint src --ext .jsx,.js --config node_modules/ufp-core/src/.eslintrc -f node_modules/eslint-bamboo-formatter/reporter.js",
    "ufp-lint:fix": "npm run ufp-lint -- --fix",
    "ufp-test": "cross-env NODE_ENV=test karma start node_modules/ufp-core/ext/presets/default/config/karma.config",
    "ufp-test:watch": "npm run ufp-test -- --watch",
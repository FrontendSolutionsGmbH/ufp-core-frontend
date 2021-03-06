# Ufp-Core-Frontend Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.0.8 Unreleased]

- remove webpack project handling in favour of react-create-app
- remove queryparams module
- update to connected-react-router


## [0.7.0]
- npm audit fixes
- migrate to cli table3 (done by the cli table team)
- missing router utility methods
- updates redux-observable towards 1.0
- remove preprocessor-loader due to compatibility issues with webpack4
- deprecation fixes

## [0.6.6]
- quasi 0.6.0 release all previous versions lack stability
- fix hoc resource utility default value usage/linting
- fix for import of lodash-es es6 import style, somehow breaking on slow connection 
- enforce selector in util/resource
- ufpdate ufp-core router4 and, redux4 update, remove getState() method completely from any action payload
- change getState() to globalState in ufp-middleware actions - redux4.0
- async router dev update 
- karma and mocha updated to 2 and 5  	
- replace lodash with lodash-es
- update react 16.3.1
- remove flow dependency
- react router 4 
	- update using [README](./src/modules/react-redux-hash-router4/doc/README.md)

## [0.6.5-0.6.0] *broken*

## [0.5.1 ] 

- indexHtmlPath config setting
- fixes for intl handling  
- change: allow parameterles resource reducer utility creation 
- fix: reload functionality for hoc resource
- change: default naming hoc resource

## [0.5.0] 

- change: no stringification of request bodies - allow multipart/FormData to pass through 
- resource utility, providing actionhandler,actioncreator, higher order component from api definition
- normalization of fail/succes/request/end actions 
- change: module interfaces, everything is provided through main index.js of module
- new: ufp-core cli command main command with stats,build,start,status commands for now managing ufp app 
    try it out with 'ufp-core' or 'node_modules/.bin/ufp-core' in case your binaries are not linked, 
    or install ufp-core globally using the -g switch
- fix: project specific webpack config
- new: devServer config in project.json
- new: HtmlFormatted message wrapped in ufp-intl
- change: internal structure featuring model/view/controller split up of components
- new: 'ufp-core init' for installing sample app 


## [0.4.6]  
- new: configure html script injection in project.json

## [0.4.5] (unreleased)
- new: enable sw-precache progressive webapp plugin

## [0.4.4] (unreleased)

- fix: production build, minification
- new: ?debug=true parameter for rendered pages enables redux-logger and redux-devtools
- new ufp-start:dist to serve static production build (run ufp-update to make available in project)


## [0.4.3]

- bugfix runtime

## [0.4.2]

- bugfix

## [0.4.1]

- bugfix
- update version react 16.2

## [0.4.0]

- introduction of promises for UfpCore methods
- onConfigure for
- updated scripts - execute 'npm run ufp-update'
- internal change: build output controllable using log4js 
- change: rename modules/rect to modules/ufp-react
- change: rename modules/redux to modules/ufp-redux
- new: UfpConfig: deep object setting/getting
- react16 dependency
- change: validate configuration objects using ReactPropTypes
- test setup utility script command 'ufp-util:createTests'
- UfpMiddlewareUtils

- CHANGE: include the following in the test-bundler.js to accomodate enzyme-3.x compatibility until
    a more convenient way is in place

        import 'ufp-core/ext/presets/default/config/karma.setup.js'


## [0.3.5]

- fix: Macro handling eslint
    replace Macro: **@ROUTER3_DYNAMICINCLUDE** with **ROUTER3_DYNAMICINCLUDE** 

## [0.3.4]

- ufp-test script command providing karma test setup
- ufp-make build command with lots of lint/test outputs for CI
- release pipeline for ufp-core testing, linting, packaging with examples

## [0.3.3]

- remove ufp-optimizer as required dependency (too long install)
- include required minimal engine versions in package.json

## [0.3.2]

- move from bitbucket to github

## [0.3.1] - 2017-09-19

- minor readme adjustment

## [0.3.0] - 2017-09-19

- initialstate callback
- rename Runfest.js to Runfest.js abbreviation for RUNtimemaniFEST
- disallow direct imports, enforce use of index.js of bundles


## [0.2.2] - 2017-09-19

- remove update dependencies during installation
- adjusted readme

## [0.2.1] - 2017-09-19

- include src in release

## [0.2.0] - 2017-09-19

- npm release

## [0.1.1] - 2017-08-23

- eslint

## [0.1.0] - 2017-08-01

- Initial Release

[Unreleased]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.7.0...develop
[Unreleased]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.7.0-rc8...0.7.0n
[0.7.0-beta]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.6.6...0.7.0-rc8
[0.6.6]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.5.0-rc1...0.6.6
[0.5.0-rc1]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.4.7...0.5.0
[0.4.7]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.4.6...0.4.7
[0.4.6]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.4.5...0.4.6
[0.4.5]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.4.4...0.4.5
[0.4.4]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.4.3...0.4.4
[0.4.3]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.4.2...0.4.3
[0.4.2]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.4.1...0.4.2
[0.4.1]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.3.4...0.4.0
[0.3.5]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.3.4...0.3.5
[0.3.4]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.3.3...0.3.4
[0.3.3]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.3.2...0.3.3
[0.3.2]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.3.1...0.3.2
[0.3.1]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.2.2...0.3.0
[0.2.2]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.2.1....2.2
[0.2.1]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.1.1...0.2.0
[0.1.1]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.1.1...0.1.0
[0.1.0]: https://github.com/FrontendSolutionsGmbH/ufp-core-frontend/compare/0.1.0

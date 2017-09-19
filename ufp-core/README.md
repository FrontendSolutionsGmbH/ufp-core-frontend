# Ufp Core

## Summary

this repository contains UFP npm modules

Ufp's aim is to reduce application develop to the bare minimum

this is achieved by providing the build infrastructure using webpack as
main build tool, configured for react, eslint, babel, scss, preprocessor,
lazy loading macros 

additionally it ships with a runtime environment easing the process of writing
packages for use with redux


[DOCS](docs/README.md)


[CHANGELOG](CHANGELOG.md)


## Installation

Clone this repo to a local folder

    NOTE: Installation is adding a npm module to your project, for now

it has to be manually without directly linking a git repo

     git clone [checkoutDir]

after cloning execute

    npm install
    npm run compile

for building the project, then you can execute

  npm install --save [checkoutDir]

to install the npm module into your project



## Quick Start

### Project Setup

1. Install ufp-core using npm

        :// npm install --save ufp-core
    
Execute ufp specific package.json project update for putting everything in place

        :// node node_modules/ufp-core/ext/UpdatePackageJson
    
2. Execute npm install for retrieving all dependencies

        :// npm install
    
3. Development folder setup 

        src/main.js
        src/index.html
        ...
    
4. Run development server using ufp- prepared npm script 

        //: npm run ufp-start
    

### Empty Application:
 
    // main.js
    // import main ufp-core 
    import UfpCore from 'ufp-core'
    
    // startup which creates redux stores and bound Manifests
    UfpCore.startup()

### Config Reducer enabled

the following example uses the config reducer to store default values upon registration, 
sets them inside the redux store using a redux action and prints out its current value 
using the ufpAutoConfigured selector to retrieve a value from it

    // main.js
    import UfpCore from 'ufp-core/lib'
    import UfpConfig from 'ufp-core/lib/modules/config/Manifest'
    
    UfpConfig.register({foo: 'bar'})
    UfpConfig.register({bar: 'foo'})
    
    UfpCore.startup()
    
    UfpConfig.setConfigValue({
      key: 'bar',
      value: 'willi'
    })
    
    UfpConfig.setConfigValue({
      key: 'hoschi',
      value: 'willi'
    })
    
    console.log('DEMO Retrieve Config', UfpConfig.getConfigValue({key: 'bar'}))

    
    
 






# Ufp Core

## Summary

Ufp-Core is a prefactured webpack build system and a redux-runtime for creating
applications as easy as possible

(Bitbucket Repo Only )
[DOCS](docs/README.md)

(Bitbucket Repo Only )
[CHANGELOG](CHANGELOG.md)

## Warning 0.2 will be deprecated in 0.3

This is the first released version of the module, next release will include
breaking changes regarding module imports. Use at own Risk!


## Quick Start

### Project Setup

0. Set up empty npm project

        npm init

1. Install ufp-core using npm

        :// npm install ufp-core --save
    
Execute ufp specific package.json project update for putting everything in place (see above)

        :// node node_modules/ufp-core/ext/Install

2. Development folder setup

        src/main.js
        src/index.html
        ...
    
3. Run development server using ufp- prepared npm script

        //: npm run ufp-start
    
3. Run production build into /dist folder using ufp- prepared npm script

        //: npm run ufp-compile


### Empty Application:
 
    // main.js
    // import main ufp-core 
    import UfpCore from 'ufp-core'
    
    // startup which creates redux stores and bound Manifests
    UfpCore.startup()

### Config Reducer enabled

** WARNING **
in v0.3 this example will use slightly different package naming, it is
using a ufp-core build int module
** WARNING **

the following example uses the config reducer to store default values upon registration,
sets them inside the redux store using a redux action and prints out its current value 
using the ufpAutoConfigured selector to retrieve a value from it

    // main.js
    import UfpCore from 'ufp-core/lib'
    import UfpConfig from 'ufp-core/lib/modules/config/Manifest'
    
    UfpConfig.register({foo: 'bar'})
    UfpConfig.register({bar: 'foo'})

    UfpCore.registerManifest(UfpConfig)

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

    
    
 






# Ufp Core

## Summary

this repository contains UFP npm modules

Ufp's aim is to reduce application develop to the bare minimum


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



### Quick Start

#### Empty Application:

    import UfpCore from 'ufp-core'
    
    // redux store creation and startup
    UfpCore.startup()

#### Config Reducer enabled

the following example uses the config reducer to store default values upon registration, sets them inside the redux store using a redux action and prints out its current value using the ufpAutoConfigured selector to retrieve a value from it

 
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

    
    


## Usage






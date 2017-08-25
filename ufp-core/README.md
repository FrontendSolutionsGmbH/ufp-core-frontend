# Ufp Core

## Summary

this repository contains UFP npm modules

Ufp's aim is to reduce application develop to the bare minimum

[CHANGELOG](CHANGELOG.md)
[DOCS](docs/README.md)

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

    import UfpCore from 'ufp-core'
    import UfpConfig from 'ufp-core/lib/modules/config/Manifest'   
    
    // declarative registration
    UfpConfig.register({foo:'bar'})
    // register can be called multiple times data will get joined
    UfpConfig.register({bar::'foo'})
        
    // redux store creation and startup
    UfpCore.startup()
    
    UfpConfig.getConfigValue({key:'bar'})
    
    
    


## Usage






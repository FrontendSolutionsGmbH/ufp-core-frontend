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

#### ufp-make [build]

this command is the main build command and features build specific
environment variable configuration.

    Direct call
    > node node_modules/ufp-core/ext/build/scripts/make [PARAMETERS]
    Call using npm-script
    > npm run ufp-make -- [PARAMETERS]
    Call using npm linked cli command
    > ufp-make [PARAMETERS]
    
Help output:
    
      > node node_modules/ufp-core/ext/build/scripts/make "--help"
      
      Options:
        --help          Show help                                            [boolean]
        --version       Show version number                                  [boolean]
        --FORCE         allow fail of single steps          [boolean] [default: false]
        --UFP_STEP      build step
                        [choices: "all", "validate", "test", "build"] [default: "all"]
        --CLEAN         rimraf build folders before start   [boolean] [default: false]
        --UFP_VERSION   project specific version,
                        provided as UFP_VERSION environment variable
                                                      [default: "ufp-version-default"]
        --UFP_API_TYPE  api type,
                        provided as UFP_API_TYPE environment variable
                                           [choices: "live", "mock"] [default: "live"]
        --UFP_NODE_ENV  node environment value,
                        provided as NODE_ENV environment variable
                [choices: "production", "development", "test"] [default: "production"]
        --UFP_THEME     theming ,
                        provided as UFP_THEME environment variable
                                                                  [default: "default"]


###  ufp-update [setup]
  
This command loads the ufp-script commands into the local package.json. As of now
this has to be done after updating to a new ufp-version due to changes/additions in 
the provided command set of ufp. 

    REMARK: only script commands documented in this document are officially supported
   
execution calls 
  
  Direct
  > node node_modules/ufp-core/ext/UpdatePackageJson
  Call using npm-script 
  > npm run ufp-update 
  

### ufp-start [development]

Starts the webpack dev server and provides the application under [http://localhost:3000](http://localhost:3000).
    
    tl;dr: the webpack configuration is setup for a /src folder in the project,
    using ufp-runtime configuration objects to setup redux store application

### ufp-lint:fix [development]

Linting plays a special role in the ufp- setup, the linting is buildin to the webpack loader, so it will complain about various code style issues that are preconfigured in ufp-core. The ufp-lint script command is what makes it visible on commandline and using the :fix option most of the issues can be fixed easily. Nevertheless here is the documentation on how to perform on that area


    Direct
    [NO DIRECT CALL AVAILABLE]
    Npm Script
    npm run ufp-lint
    
 and appending the :fix option
 
    npm run ufp-lint:fix
    
    


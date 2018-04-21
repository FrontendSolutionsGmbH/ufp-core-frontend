

![UFP Logo Anim](docs/img/froso.svg "UFP Logo Anim") ![UFP Logo Anim](docs/img/ufp.svg "UFP Logo Anim")

# Ufp Core Frontend

## Alpha Version (use at own risk)

Ufp-Core-Frontend is a Webpack build manager and a [redux-runtime](https://github.com/reactjs/redux). 

The setup makes uses [ReduxThunk](https://github.com/gaearon/redux-thunk) and [ReduxObservable](https://github.com/redux-observable/redux-observable).
  
Ufp-Runfest concept defines the runtime configuration in a easy to use manner, a Runfest.js is registered
against the ufp-core and provides registering to the redux stor

build in modules:

**ufp-startup** providers handling of application initialisation

**ufp-menu** provides application menu handling

**ufp-epic** provides RxJs ReduxObservable Epic registration

**ufp-intl** provides managing of ReactIntl redux internationalisation handling, handling redux-intl provider

**ufp-config** key/value store for application settings (see example)

**ufp-react** react15.x react handling providing a global redux-provider

**ufp-redux-form** ReduxForm Runfest registering Reducer and provides ReduxForms - as is

[DOCS](docs/README.md)

[CHANGELOG](CHANGELOG.md)

## Quick Start

### Project Setup

0. Set up empty npm project

        > npm init

1. Install ufp-core using npm

        > npm install ufp-core --save
    
Execute ufp specific package.json project update for putting everything in place (see above)

        > node node_modules/ufp-core/ext/Install

2. Development folder setup

        src/main.js
        src/index.html
        ...
    
3. Run development server using ufp- prepared npm script

        > npm run ufp-start
    
3. Run production build into /dist folder using ufp- prepared npm script

        > npm run ufp-compile


### UFP Cli

when installed using -g ufp-core provides the following cli commands:

	$ ufp --help
	ufp-core.js
	
	default ufp command
	
	Commands:
	  ufp-core.js           default ufp command                            [default]
	  ufp-core.js i         initialise ufp-application               [aliases: init]
	  ufp-core.js s [dist]  start ufp application dev server        [aliases: start]
	  ufp-core.js b         build ufp application                   [aliases: build]
	  ufp-core.js st        some informations about ufp-application[aliases: status]
	  ufp-core.js ct        create predefined test cases e.g. existance
															  [aliases: createTests]
	  ufp-core.js t         execute the unit tests                   [aliases: test]
	  ufp-core.js sp        show npm package description of used packages
															 [aliases: showpackages]
	
	Options:
	  --version  Show version number                                       [boolean]
	  --help     Show help                                                 [boolean]
	



### Empty Application:
```javascript
        // main.js
        // import main ufp-core 
        import UfpCore from 'ufp-core'
        
        // startup which creates redux stores and bound Manifests
        UfpCore.startupUfpCore()
```
### Config Reducer enabled

the following example uses the config reducer to store default values upon registration,
sets them inside the redux store using a redux action and prints out its current value 
using the ufpAutoConfigured selector to retrieve a value from it

```javascript 
    // main.js
    import UfpCore from 'ufp-core'
    import {ConfigRunfest, registerConfigDefault} from 'ufp-core/lib/modules/config'

    registerConfigDefault({foo: 'bar'})
    registerConfigDefault({bar: 'foo'})

    UfpCore.registerManifest(ConfigRunfest)

    UfpCore.startupUfpCore()
    
    ConfigRunfest.setConfigValue({
      key: 'bar',
      value: 'willi'
    })
    
    ConfigRunfest.setConfigValue({
      key: 'hoschi',
      value: 'willi'
    })
    
    console.log('DEMO Retrieve Config', ConfigRunfest.getConfigValue({key: 'bar'}))
```

### Hints

* for binary execution of installed npm modules enter ./node_modules/.bin into your $PATH env config



### Philosophy
@startuml 


- comp4props          
- group
- propTypes
@enduml

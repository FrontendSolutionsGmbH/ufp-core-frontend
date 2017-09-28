# Ufp Core Frontend

![UFP Logo Anim](docs/img/ufp.svg "UFP Logo Anim")

Ufp-Core-Frontend is a Webpack build system managing a side effect enabled Redux store using  ReduxThunk and ReduxObservable .   The Ufp-Middleware is designed to provide application wide interceptions for asyncronous operations. Ufp-Runfest is the Runtime Manifest definition to construct ufp-applications.

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


### Empty Application:
 
    // main.js
    // import main ufp-core 
    import UfpCore from 'ufp-core'
    
    // startup which creates redux stores and bound Manifests
    UfpCore.startupUfpCore()

### Config Reducer enabled

the following example uses the config reducer to store default values upon registration,
sets them inside the redux store using a redux action and prints out its current value 
using the ufpAutoConfigured selector to retrieve a value from it

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


### UFP Quick Reference

the following modules are build in to ufp-core

#### ufp-config

reducer for storing key values

#### ufp-menu

organize menus with side effects (react to actions)

#### ufp-startup

organize the startup of your application by registering expected behaviour
during startup, declare initial action, and success/fail actions

#### ufp-middleware

asyncronous action handling with hooks for pre/post handling of those

#### epic

rxjs redux-observable is enabled and epics can be registered using this Runfest

#### intl

react-intl2 is included as well and provides actions to deal with intl setup

#### react

react15.x is included configure using a root dom element and a jsx component

#### react-redux-hash-router3

wrapper to provide routing, for now hash routing only is defined

#### redux-form

wrapper for redux form the Runfest registers the redux-form reducer and
makes all connect methods usable in components





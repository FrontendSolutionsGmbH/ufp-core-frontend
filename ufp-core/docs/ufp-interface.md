# Ufp Interface

The following is the official Ufp-Core Interface to the outside world it provides the registration methods for setting up a redux application store

## Preliminary

the following interface is the first setup, it basically starts out with wrapping core redux functionality. this wrapped functionality is used to collect application setup throughout the startup process, 

    NOTE: all of the register methods are for now declarative only which means they can not be called after application start
    
## registerReducer(reducer)

registers a [Redux Reducer](http://redux.js.org/docs/basics/Reducers.html) 
registers a [Redux Reducer](http://redux.js.org/docs/Glossary.html#reducer) 



## registerMiddleware(middleware)                 

registers a [Redux Middleware](http://redux.js.org/docs/advanced/Middleware.html) 
registers a [Redux Middleware](http://redux.js.org/docs/Glossary.html#middleware) 

## registerEnhancer(enhancer)
                               
registers a [Redux Store Enhancer](http://redux.js.org/docs/api/createStore.html#arguments) 

## registerManifest(manifest)

this is the preliminary definition of a ufp-core functionality the plan is to host all required information for a ufp-module inside the manifest file for registering

## startup

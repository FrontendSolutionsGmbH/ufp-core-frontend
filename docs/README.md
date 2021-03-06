# Ufp Core Documentation

Ufp Core consists of some concepts and defines interfaces to deal with it, to document this is purpose of this document


## Summary

Ufp Core provides Redux store Reducer and Middleware management, as well as actionCreator and Selector handling defined in Manifests - the ufp module name

## Ufp Configuration

Ufp is built upon Redux, the configuration section contains information on how to reuse existing
redux modules and how to inject own redux modules into the system

[UFP Configuration](ufp-configuration.md)
## Ufp Script Commands

Ufp provides npm script commands to be used by the project. These include the webpack dev
server start, the testing, the linting, and the building of the project

[UFP Script Commands](ufp-script-commands.md)

## Ufp Concepts

Please refer to this document to get more information about why some techniques are used inside the ufp infrastructure

[UFP Concepts](ufp-concepts.md)
 
 
## Ufp Core Interface

The UfpCore is the main entry point to deal with the ufp infrastructure, refer to this to get more information on Manifest creation but as well general usage

[UFP Core Interface](ufp-interface.md)
 
 
## Ufp Manifest

A Manifest defines an ufp module, this document describes how to setup a manifest and how to use their actions and selectors for changing and retrieving data from the state

[UFP Manifests](ufp-manifest.md)
 
## Ufp Redux MiddleWare

The core module of ufp is the middleware, the middleware is repsonsible for handling asyncronous requests and
provide interceptor hooks to keep control over asyncronous actity


[UFP Middleware](ufp-middleware.md)
 

# Ufp Concepts

Ufp is meant to ease the application development of modern applications using javascript. 

The whole ecosystem relies on the famous (Redux)]https://github.com/reactjs/redux] framework. Why it is famous? side note: it is not connected to reactjs just has been developed by them. So let me leave a note why it is famous. 


## Ecosystem

the core ecosystem consists of the next main modules which are described why they are choosen 

### Webpack/Babel

For packaging Webpack3 is used. Since modern application development heavily relies on continous development techniques webpack is the tool of choice for handling bundling of web applications

### Redux

Redux implements a straight method for storing application data, and they make various assumptions about the data which are quite helpful if not correct:

1. Each Application owns a state - period.
2. Each change of this state leads to any change in the application

and with these assumptions in place they provide the mechanics of changning the *global* state and keeping an immutable version of it - remember: immutable means easy tracking of changes

#### Redux Thunk Middleware

### (Redux) RxJs 

The core concept of Redux is super strict, it is so strict that it does not implement any advanced functionality like asyncronous requests and strictly forbids side effects from actions. A side effect is basically if an action triggers another action - and even worse side effects are called everything which changes application state without using actions e.g. use browser back button directly ) 

This is where RxJs comes into play, it implements an advanced concept extending the promise functionality of es6 it is called streams and can be seen as promises that resolve more than once

by putting this redux=rxjs implementation in place an application can safely define action to action logiks and whatever an application need to check from time to time

HINT: login/logout mechanics would be horrible without it


### React JS/Native

The now - as well - famous js framework called ReactJS is a production ready html-js framework that is production ready tested by 1billion(german:milliarde) people on this planet. period. 

Its feature to even create Native Android/Ios code with the same code base is what further hardens the decision to go with this framework fully

        NOTE:
        
        UFP is not bound to React, AngularJS could be used easily as well its just so that we do not see it as production ready framework and hence wont provide any support for angularJS1/2



### (React) Prop Types

Type checking in JS is always something to tinker about. It can be done at compile time using transpiler like babel with typescript, or media runtime like just use it for development but not production

Type checking is crucial, and the ufp ecosystem relies on type checking for user interface setup

so, whats all the fuzz then? its about making it contained in the program, syntaktical type checking is done at runtime for various purposes utilising the ReactPropTypes module for defining possible semantics on types

# Ufp Concepts

Ufp is meant to ease the application development of modern applications using javascript. 

The whole ecosystem relies on the famous (Redux)]https://github.com/reactjs/redux] framework. Why it is famous? side note: it is not connected to reactjs just has been developed by them. So let me leave a note why it is famous. 

Redux implements a straight method for storing application data, and they make various assumptions about the data which are quite helpful if not correct:

1. Each Application owns a state - period.
2. Each change of this state leads to any change in the application

and with these assumptions in place they provide the mechanics of changning the *global* state and keeping an immutable version of it - remember: immutable means easy tracking of changes



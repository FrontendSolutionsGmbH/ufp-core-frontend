# Ufp Manifest

 A a javascript object providing a 'name' property and a register() method makes it a Ufp-Manifest. A Ufp=Manifest is a module in the UFP Ecosystem. All Ufp-Manifests are initialised using the regiser() methods in their module
 
 within that register() method various callbacks can be installed for correct initialisation
 of a redux store, e.g. provide declarative config for middleware and such. Declarative Initialisation is for now the main concept implemented by Ufp 
 
    REMARK BY CK: why dont we use more stuff like dependency injection? christian 
    likes dependency injection as hell, and we will see when we are going to really need
    it, especially it might come out that it is implemented implicitly by what i mean 
    that various exchangeable parts handle it by themselve declarative and the interface
    that is going to be implemented is a pure Ufp-Redux-Module Interface which consists
    solely out of ActionCreators and Selectors nothing more and nothing less, and yes a
    dependency injection mechanism might come in really handy at some day e.g. a 
    Logger dependency injection to the manifests, this is certainly not dead just not 
    focused on today!
 
 
 
## Ufp Manifest Usage

for any ufp-manifest the usage shall be similar to the following steps:

1. call Manifest.register(..params) 
    - marking that this manifest shall be used inside ufp
    - and provide any configuration for initial data or configuration options
    - this register() methos is explicitly designed to be called multiple times using ufps first main approach declarative method ->which means startup() needs to be called after ALL initialisations, dynamic registration of modules will be provided ASAP
2. call UfpCore.startup() 
    - for triggering the redux store creation
    - for building the ufp initial reducer state
    - for binding actioncreators to reduxs store.dispatch() of all Manifest.actionCreators to the Manifest root
    - for binding selectors to redux store.getState() of all Manifest.selectors to the Manifest root
    - for triggering UFP-STARTUP action
    

thats it but next is actual usage of UfpManifest during Runtime:

3. call Manifest.actionCreatorName()   
    - for executing any of the actions defined in Manifest.actionCreators object using their original signatures (sigh i am unsure how to make it IDE aware)
4. call Manifest.selectorName()
    - for retrieving a selector value from any selector defined in Manifest.selectors object usingt their original(sigh IDE) signatures 
    
please refer to minimal-null implementation for example usage of above 
             
 
## Ufp Manifest Reference

For now this is the definition what each ufp-module has to define in its Runfest.js file

### register()

the register method has to deal with registration the module into ufp-core see examples in UfpConfig Module

Registration is done using UfpCore.registerXXX functions to register reducer,middleware or enhancers into the redux system

### name'''

a name is always nice to have, every Reducer that is registered uses this name as entry point in the redux state tree (governed by ufp so below ufp. somewhere in the state tree)


### actionCreators[]

the actioncreators become all available in the main Manifest import, which means they can be called directly (using their apropriate signatures) and execute actions

this is achieved by just providing the XXXActionCreators import of a module, providing each actioncreator as hash entry example:

    actionCreators={
        myAction::()=>{type:'ACTION',payload:{}}
    }


### selectors[]                                       
the selectors become all available in the main Manifest import, which means they can be called directly (using their apropriate signatures) and obtain values
                
this is achieved by just providing the XXXSelectors import of a module, providing each selector as hash entry example:

    selectors={
        mySelector::(state)=>state
    }

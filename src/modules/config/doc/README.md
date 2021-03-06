# UFP Config Reducer

this reducer is used to hold any type of configuration and provides setConfigValue action creator for updating config and getConfigValue selectors for getting the config values as needed


## Note

this reducer is a core ufp reducer since it is used for anything related to application config storing

## Reference

### Usage
      
    import UfpCore from 'ufp-core/lib' 
    import UfpConfig from 'ufp-core/lib/modules/config/Manifest'  
       
    // register first
    UfpConfig.register({foo: 'bar'},'areaName)   
          
    // start ufp
    UfpCore.startup() 
    
    UfpConfig.setConfigValue({key: 'foo',value: 'bar'[,area:'default]})
    console.log(UfpConfig.getConfigValue({key: 'foo' [,area:'default]}))

       
#### UfpConfig.register(initialState,area=['default']) 

this method is used to activate the module and provide some initial data,
note that this method is designed to be used by any module existant, all
modules that use a dependency to this module will call their desired configuration
values inside their own register() runfest methods

### Action Creators

there is only one actioncreator in this package

#### UfpConfig.setConfigValue 

sets the desired config value, signature and parameter defaults are:

    ConfigActionCreators.setConfigValue: ({
        key = ThrowParam('Config Key has to be set'),
        value = ThrowParam('Config value has to be set'),
        area = 'default'
    }) 
     
##### Example
 
ufp-core binds the actioncreators and selectors to the store in the main runfest,
unbounded and original actioncreator is retrieved like this:
    
    import UfpConfig from 'ufp-core/lib/modules/config/Runfest'
      
    // Bound ActionCreator
    UfpConfig.setConfigValue
     
    // Unbound Actioncreator (to be used by connect() redux utilities
    UfpConfig.actionCreators.setConfigValue
   
    

               
### Selectors

There is only one selector needed to retrieve a config value

#### getConfigValue 

a stored config value is accessed using the selector providing key and optional area 

    ConfigSelectors.getConfigValue: (globalState,{
            key = ThrowParam('Config Key has to be set'),
            area = 'default'
    })
 

ufp-core binds the actioncreators and selectors to the store in the main runfest,
unbounded and original actioncreator is retrieved like this:
     
    // Bound ActionCreator
    UfpConfig.getConfigValue
     
    // Unbound Actioncreator (to be used by connect() redux utilities
    UfpConfig.actionCreators.getConfigValue
   




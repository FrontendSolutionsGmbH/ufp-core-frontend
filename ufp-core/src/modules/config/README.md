# UFP Config Reducer

this reducer is used to hold any type of configuration and provides setConfigValue action creator for updating config and getConfigValue selectors for getting the config values as needed


## Note

this reducer is a core ufp reducer since it is used for anything related to application config storing

## Reference

### Instantiation


### Action Creators

#### ConfigActionCreators.setConfigValue 

sets the desired config value, signature and parameter defaults are:

    ConfigActionCreators.setConfigValue: ({
        key = ThrowParam('Config Key has to be set'),
        value = ThrowParam('Config value has to be set'),
        area = 'default'
    }) 
    
    NOTE: ThrowParam() indicates mandatory
    
               
### Selectors
#### getConfigValue 
a stored config value is accessed using the selector 


    ConfigSelectors.getConfigValue: (globalState,{
            key = ThrowParam('Config Key has to be set'),
            area = 'default'
    })
           
    NOTE: ThrowParam() indicates mandatory


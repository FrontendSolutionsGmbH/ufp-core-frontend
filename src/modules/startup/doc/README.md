# Ufp Startup

The Startup module is used to watch over the initialisation process

    usage:

        import UfpCore from 'ufp-core'
        import {Runfest} from 'ufp-core/lib/modules/startup

        UfpCore.registerRunfest(Runfest)

## api:
  
### registerStagedResource

a stage is registered using a name and stage identifier (it can be anything but numbers work well)
it works by providing an action creator to be triggered as the init of the process,
required flag controls if it should prevent the startup to go on if failed, 2 more action names
are declared to identify success/or fail

    Signature:
    registerStagedResource({
        stage,
        name,
        actionCreator,
        actionCreatorParams = [],
        required = true,
        actionNameSuccess,
        actionNameFailure

    }) 
    
    Usage:
        import {registerStagedResource} from 'ufp-core/lib/modules/startup
        registerStagedResource({
        [... see above]
        })
    
   
### registerRootSibbling

registers a react root sibbling, may be used for non invasive html represantatives,
e.g. tracking scrolling
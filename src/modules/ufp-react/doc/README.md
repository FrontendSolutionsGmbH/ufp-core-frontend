# Ufp React

Ufp React manages the entry node of react into the html, 


    usage:

        import UfpCore from 'ufp-core'
        import {Runfest} from 'ufp-core/lib/modules/ufp-react

        UfpCore.registerRunfest(Runfest)

## api:
  
### registerProvider

the registered providers are injected into the root component and though available


   
### registerRootSibbling

registers a react root sibbling, may be used for non invasive html represantatives,
e.g. tracking scrolling
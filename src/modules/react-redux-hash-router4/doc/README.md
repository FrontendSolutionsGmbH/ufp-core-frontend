# Ufp React Redux Hash Router3

this is the ufp react router3 wrapper, usage

## Usage

register in main application runfest



        import UfpCore from 'ufp-core'
        import {Runfest} from 'ufp-core/lib/modules/react-redux-hash-router4

        UfpCore.registerRunfest(Runfest)

        
use react-router4 routes anywhere in the program
       
        import React from 'react'
        import {Route} from 'react-router-dom' 
          
        
        export default () => {
		return (
		   <Route  path="/somePath" component="Component"/>}/>  
	           )
	   } 
	   
# Utility Method convert react-router3 to router4

	import {ConvertRouter3DefTo4} from 'ufp-core/lib/modules/react-redux-hash-router4'
	   
	const Convert3To4Routes = ( props) => {
		return () => { 
			return ConvertRouter3DefTo4(props.children)) 
		}
	}
	
	export default Convert3To4Routes

for that you might need:

	import { asyncComponent } from 'react-async-component'
	
as import in router3 definition file

and use 'component' instead of 'getComponent' for lazy usage 
but prefer way here is to switch completely to router4 on the client, so beware of using the now deprecated macro:

  {
                path: 'someRoute',
                component: ROUTER3_DYNAMICINCLUDE('componentPath')
   }
            

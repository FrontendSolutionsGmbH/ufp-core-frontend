# Ufp React Redux Hash Router3

this is the ufp react router3 wrapper, usage

## Usage

register in main application runfest



        import UfpCore from 'ufp-core'
        import {Runfest} from 'ufp-core/lib/modules/react-redux-hash-router3

        UfpCore.registerRunfest(Runfest)

        
insert router in root component (may change using register provider in later versions)
       
        
        import React from 'react'
        import {Router} from 'react-router'
        import AppRoutes from '../../routes'
        import {syncHistoryWithStore} from 'ufp-core/lib/modules/react-redux-hash-router3' 
        
        const App = ({UfpCore}) => {
            return () => {
                 return (
                    <Router history={syncHistoryWithStore(UfpCore.getStore())} />} >
                        [refer to react-router 3]
                    </Router>
        
                )
            }
        }
        
        export default App
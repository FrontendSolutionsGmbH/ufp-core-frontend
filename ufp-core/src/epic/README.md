# UFP Core Epics (redux-rxjs)

Ufp Core provides the rxjs redux interface

# Usage

register manifest to ufp-core application


    import UfpEpic from 'ufp-core/lib/epic/Manifest'
    UfpCore.registerManifest(UfpEpic);


configure the epics using

    UfpEpic.registerEpic(
    (action$, store) => {
        // do whatever your epic might do
        return action$.filter((action) => {
            if (action.type !== SOME_ACTION_NAME) {
                // do something when this action occured
            }
    }
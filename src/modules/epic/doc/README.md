# UFP Core Epics (redux-rxjs)

Ufp Core provides the rxjs redux-observable

https://redux-observable.js.org/

which uses in turn the rxjs stream library

https://github.com/Reactive-Extensions/RxJS

# Usage

register manifest to ufp-core application


    import UfpEpic from 'ufp-core/lib/epic/Manifest'
    UfpCore.registerRunfest(UfpEpic);


configure the epics using

    UfpEpic.registerEpic(
    (action$, store) => {
        // do whatever your epic might do
        return action$.filter((action) => {
            if (action.type !== SOME_ACTION_NAME) {
                // do something when this action occured
            }
    }
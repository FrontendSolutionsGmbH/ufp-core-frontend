# UFP History / Mission Statement

the idea for UFP came up when composing frontend applications using react and redux became very tedious,
for letting redux modules do their work they have to be registered to the redux subsystem which produced
lots of boilerplate code

it came down to what ufp is now, a registration system for runtime modules - that handle all sorts of tasks
 like registering root provider in a (possible) react subsystem.  handle asyncronous request -
this has manifested in the name 'Runfest' for the runtime configuration

## current state and target

in its current form it simplifies application building process - at least for the authors - the foloowing
points should be resolved for a release 1.0 

- declarative - deciding of how declarative one should be, only forward declarations leaving existing instance alone, a kind of backward declaration such a way that when an instance requires another instance of certain type will get wired together
when lazy loading such component
- async  - async handling is rather straightforward after previous point is ruled out
  
  
details like lifecycle events or modules that belong to the core or float freely is not dependant for a release 1.0

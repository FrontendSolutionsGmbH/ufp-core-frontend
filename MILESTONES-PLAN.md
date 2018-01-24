 

## This Repositories (UfpCore) planned milestone 

this document serves as a reminder of what is actually planned


- ufp-core v1.0
    - config managament state and configure whole application with it
       - loading/restoring state
       - use for module configuration
       - todo: enable some sort of autowiring (comp4props maybe)
       - todo: enable async (or runtime ) registration of runfests
    - comp4props
        - todo: provide comp4props ufp-core base module
        - todo: provide factory methods to create the desired declaration
        - todo: use webpack as an autoscanning callback
        - todo: provide async callback
        - todo: provide renderer using the registered comp4props
    
    - middleware
        - todo: package middleware payload into all messages, meaning current payload moves one down
        - recording of fetch request for mocking database
    - testing
        - unit testing in browser
        - todo: enable unit testing just for node 
        - todo: use mocha and pupeteer for functional testing (requires: automatic mock data recording)
                                              


- ufp-core vx.x 
    - split up into 'ufp-core-cli' and 'ufp-core-runtime'

#UFP Make

work in progress, organize shell commands hierarchically, using json, here is quick
reference for the planned functionality

this shall reflect what is currently done inside the ufp-core make script
and the project used ufp-make script command, 

idea: 

the goal is to create a multi step build automation tool without introducing
specific dependencies again, 
## ufp-make.json

    CommandLisType=
    [
        either string: 
        "shell command",
        
        or command object:
        {
            command:'shell command'
            name:'command human readable',
            description:'extended command for log level=INFO',
            allowedToFail: true/false [default:false]
        },
        
        or command group object:
        {
            commands: [ARRAY of CommandListYpe ]
            name:'command human readable',             
            description:'extended command for log level=INFO',
            allowedToFail: true/false [default:false]
        }
    ]

# Ufp Middleware

The UFP Middleware hosts the core ufp concept: flexible action handling with the following configuration possibility on any ufp-middleware-action

    - PRE-ACION  
    - SUCCESS 
    - FAIL 
    - POST-ACTION
    
Each Action can be intercepted using the following hooks:

    - PreActionHandler
    - PostActionHandler
        - Handled (multiple)
        = Succes (only one handler shall resolve)
        - Fail (multiple)
    - DefaultActionHandler 
           

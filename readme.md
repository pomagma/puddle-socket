[![Build Status](https://travis-ci.org/pomagma/puddle-hub.svg?branch=master)](http://travis-ci.org/pomagma/puddle-hub)
[![NPM Version](https://badge.fury.io/js/puddle-hub.svg)](https://www.npmjs.org/package/puddle-hub)
[![NPM Dependencies](https://david-dm.org/pomagma/puddle-hub.svg)](https://www.npmjs.org/package/puddle-hub)
[![Coverage Status](https://img.shields.io/coveralls/pomagma/puddle-hub.svg)](https://coveralls.io/r/pomagma/puddle-hub?branch=master)

## Puddle-hub

Socket.io adapter for puddle-crud to sync data server<=>browser


###Features:    
    [X] Server <=> Client sync               
    [X] Consists of Server and Client parts  
    [X] Conforms to Corpus CRUD API    
    [X] Does not use puddle syntax
    [X] Synchronizes puddle-crud instances
    Todo:
    [ ] Optimistic and pessimistic events (fires instantly and upon server confirmation) 
    
    
###Installation:
    
    npm install puddle-hub
    npm test        # optional
    
###Usage:    
    //on the Server
    var app = require('express')();
    var server = require('http').Server(app);    
    var hubServer = require(‘puddle-hub’).server(server);
    server.listen(80);
    
    //on the Client
    var hubClient = require(‘puddle-hub’).client();
    
    //returns current state as hash for format see puddle-crud repo.
    hubClient.on('reset', function(hash) {})
    
    hub.create(id,obj)
    hub.remove(id)
    hub.update(id,obj)
        
    hub.on('create', function(id, obj) {} );
    hub.on('remove', function(id) {} );
    hub.on('update', function(id, obj) {} );

    //Each .create, .remove, .update method will emit corresponding event locally.                                      

## Contributors

- Fritz Obermeyer <https://github.com/fritzo>
- Yan T. <https://github.com/yangit>

Puddle was factored out of [Pomagma](https://github.com/fritzo/pomagma) in 2014.

## License

Copyright 2013-2014 Fritz Obermeyer.<br/>
Puddle is licensed under the [MIT license](/LICENSE).
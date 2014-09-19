[![Build Status](https://travis-ci.org/pomagma/puddle-socket.svg?branch=master)](http://travis-ci.org/pomagma/puddle-socket)
[![NPM Version](https://badge.fury.io/js/puddle-socket.svg)](https://www.npmjs.org/package/puddle-socket)
[![NPM Dependencies](https://david-dm.org/pomagma/puddle-socket.svg)](https://www.npmjs.org/package/puddle-socket)
[![Coverage Status](https://img.shields.io/coveralls/pomagma/puddle-socket.svg)](https://coveralls.io/r/pomagma/puddle-socket?branch=master)

## Puddle-socket

Socket.io adapter for puddle-hub to sync data server<=>browser


###Features:    
    [X] Server <=> Client sync               
    [X] Consists of Server and Client parts  
    [X] Conforms to Corpus CRUD API    
    [X] Does not use puddle syntax
    [X] Synchronizes puddle-crud instances
    Todo:
    [ ] Optimistic and pessimistic events (fires instantly and upon server confirmation) 
    
    
###Installation:
    
    npm install puddle-socket
    npm test        # optional
    
###Usage:    
    //on the Server
    var app = require('express')();
    var server = require('http').Server(app);    
    var puddleSocket = require(‘puddle-socket’).server(server);
    server.listen(80);
    
    //on the Client
    var puddleSocket = require(‘puddle-socket’).client();
    puddleSocket.on('reset', function (state) {
        //this will fire on each client reconnect to socket.IO. 
        //I.e. on browser start/refresh/connection restore
    })

From now on any CRUD events/method calls will propagate among server and all it's clients.
For puddle-socket API see puddle-hub API                                          

## Contributors

- Fritz Obermeyer <https://github.com/fritzo>
- Yan T. <https://github.com/yangit>

Puddle was factored out of [Pomagma](https://github.com/fritzo/pomagma) in 2014.

## License

Copyright 2013-2014 Fritz Obermeyer.<br/>
Puddle is licensed under the [MIT license](/LICENSE).
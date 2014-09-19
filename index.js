'use strict';

var Debug = require('debug');
var Hub = require('puddle-hub');
var _ = require('lodash');
var assert = require('assert');

exports.server = function (io) {
    assert(io,'No SocketIO instance given');
    var debug = Debug('puddle:hub:server');
    var hub = new Hub();
    debug('loaded');

    var puddleHub = io.of('/puddleHub');
    puddleHub.on('connection', function (socket) {
        socket.emit('reset', hub.getState(), socket.id);
        ['reset', 'create', 'remove', 'update'].forEach(function (action) {
            socket.on(action, function () {
                var args = _.toArray(arguments);
                args.pop();
                args.push(socket.id);
                hub[action].apply(hub, args);
            });
            hub.on(action, function () {
                var args = _.toArray(arguments);
                args.unshift(action);
                socket.emit.apply(socket, args);
            }, socket.id);
        });
    });
    return hub;
};


exports.client = function (io) {
    assert(io,'No SocketIO instance given');

    var debug = Debug('puddle:hub:client');

    var socket = io('/puddleHub');
    var hub = new Hub();
    var ignoredName = 'socket';
    ['reset', 'create', 'remove', 'update'].forEach(function (action) {
        socket.on(action, function () {
            var args = _.toArray(arguments);
            args.pop();
            args.push(ignoredName);
            hub[action].apply(hub, args);
        });
        hub.on(action, function () {
            debug('local action called');
            var args = _.toArray(arguments);
            args.unshift(action);
            socket.emit.apply(socket, args);
        }, ignoredName);
    });

    return hub;
};

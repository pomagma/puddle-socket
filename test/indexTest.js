'use strict';
var assert = require('assert');
var sinon = require('sinon');
var rewire = require('rewire');
var puddleSocket = rewire('../index.js');
var Debug = require('debug');
var debug = Debug('puddle:socket');


describe('puddle-socket', function () {
    describe('module', function () {
        describe('throws if no socketIO object given to', function () {
            it('.client', function () {
                assert.throws(puddleSocket.client);
            });
            it('.server', function () {
                assert.throws(puddleSocket.server);
            });
        });
    });
    describe('clientside:', function () {
        var clientSocket;
        var ioMock;
        var id = '1';

        beforeEach(function () {
            ioMock = {
                on: sinon.spy(),
                emit: sinon.spy()
            };
            clientSocket = puddleSocket.client(function () {
                return ioMock;
            });
        });
        describe('socket', function () {
            it('.reset triggers socket.emit(reset)', function () {
                assert(!ioMock.emit.called);
                clientSocket.reset();
                assert(ioMock.emit.calledOnce);
                debug(ioMock.emit.args);
                assert(ioMock.emit.alwaysCalledWith('reset'));
            });
            it('.create triggers socket.emit(create)', function () {
                assert(!ioMock.emit.called);
                clientSocket.create(id, {});
                assert(ioMock.emit.calledOnce);
                debug(ioMock.emit.args);
                assert(ioMock.emit.alwaysCalledWith('create'));
            });
            it('.remove triggers socket.emit(remove)', function () {
                assert(!ioMock.emit.called);
                clientSocket.create(id, {});
                clientSocket.remove(id);
                assert(ioMock.emit.calledTwice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.calledWith('remove'));
            });
            it('.update triggers socket.emit(update)', function () {
                assert(!ioMock.emit.called);
                clientSocket.create(id, {});
                clientSocket.update(id, {});
                assert(ioMock.emit.calledTwice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.calledWith('update'));
            });

        });
    });

    describe('serverside:', function () {
        var serverSocket;
        var ioMock;
        var id = '1';

        beforeEach(function () {
            ioMock = {
                on: sinon.spy(),
                emit: sinon.spy()
            };
            serverSocket = puddleSocket.server(
                {
                    of: function () {
                        return {
                            on: function (event, cb) {
                                if (event === 'connection') {
                                    cb(ioMock);
                                }
                            }
                        };
                    }
                }
            );
        });
        describe('socket', function () {
            it('onconnection emits reset', function () {
                assert(ioMock.emit.calledOnce);
                assert(ioMock.emit.alwaysCalledWith('reset'));
            });
        });
        describe('socket', function () {

            it('.reset triggers socket.emit(reset)', function () {
                assert(ioMock.emit.calledOnce);
                serverSocket.reset();
                assert(ioMock.emit.calledTwice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.alwaysCalledWith('reset'));
            });
            it('.create triggers socket.emit(create)', function () {
                assert(ioMock.emit.calledOnce);
                serverSocket.create(id, {});
                assert(ioMock.emit.calledTwice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.calledWith('create'));
            });
            it('.remove triggers socket.emit(remove)', function () {
                assert(ioMock.emit.calledOnce);
                serverSocket.create(id, {});
                serverSocket.remove(id);
                assert(ioMock.emit.calledThrice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.calledWith('remove'));
            });
            it('.update triggers socket.emit(update)', function () {
                assert(ioMock.emit.calledOnce);
                serverSocket.create(id, {});
                serverSocket.update(id, {});
                assert(ioMock.emit.calledThrice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.calledWith('update'));
            });

        });
    });

});
'use strict';
var assert = require('assert');
var sinon = require('sinon');
var rewire = require('rewire');
var hub = rewire('../hub/hub.js');
var Debug = require('debug');
var debug = Debug('puddle:hubTest');


describe('puddle-hub', function () {
    describe('module', function () {
        describe('throws if no socketIO object given to', function () {
            it('.client', function () {
                assert.throws(hub.client);
            });
            it('.server', function () {
                assert.throws(hub.server);
            });
        });
    });
    describe('clientside:', function () {
        var clientHub;
        var ioMock;
        var id = '1';

        beforeEach(function () {
            ioMock = {
                on: sinon.spy(),
                emit: sinon.spy()
            };
            clientHub = hub.client(function () {
                return ioMock;
            });
        });
        describe('hub', function () {
            it('.reset triggers socket.emit(reset)', function () {
                assert(!ioMock.emit.called);
                clientHub.reset();
                assert(ioMock.emit.calledOnce);
                debug(ioMock.emit.args);
                assert(ioMock.emit.alwaysCalledWith('reset'));
            });
            it('.create triggers socket.emit(create)', function () {
                assert(!ioMock.emit.called);
                clientHub.create(id, {});
                assert(ioMock.emit.calledOnce);
                debug(ioMock.emit.args);
                assert(ioMock.emit.alwaysCalledWith('create'));
            });
            it('.remove triggers socket.emit(remove)', function () {
                assert(!ioMock.emit.called);
                clientHub.create(id, {});
                clientHub.remove(id);
                assert(ioMock.emit.calledTwice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.calledWith('remove'));
            });
            it('.update triggers socket.emit(update)', function () {
                assert(!ioMock.emit.called);
                clientHub.create(id, {});
                clientHub.update(id, {});
                assert(ioMock.emit.calledTwice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.calledWith('update'));
            });

        });
    });

    describe('serverside:', function () {
        var serverHub;
        var ioMock;
        var id = '1';

        beforeEach(function () {
            ioMock = {
                on: sinon.spy(),
                emit: sinon.spy()
            };
            serverHub = hub.server(
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
        describe('hub', function () {

            it('.reset triggers socket.emit(reset)', function () {
                assert(ioMock.emit.calledOnce);
                serverHub.reset();
                assert(ioMock.emit.calledTwice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.alwaysCalledWith('reset'));
            });
            it('.create triggers socket.emit(create)', function () {
                assert(ioMock.emit.calledOnce);
                serverHub.create(id, {});
                assert(ioMock.emit.calledTwice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.calledWith('create'));
            });
            it('.remove triggers socket.emit(remove)', function () {
                assert(ioMock.emit.calledOnce);
                serverHub.create(id, {});
                serverHub.remove(id);
                assert(ioMock.emit.calledThrice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.calledWith('remove'));
            });
            it('.update triggers socket.emit(update)', function () {
                assert(ioMock.emit.calledOnce);
                serverHub.create(id, {});
                serverHub.update(id, {});
                assert(ioMock.emit.calledThrice);
                debug(ioMock.emit.args);
                assert(ioMock.emit.calledWith('update'));
            });

        });
    });

});
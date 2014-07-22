/**
 * Copyright 2014 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
var should = require("should");
var should = require("should");
var fs = require('fs-extra');
var path = require('path');
var when = require("when");
var defer = when.defer();
var RedNode = require("../../../red/nodes/Node");
var index = require("../../../red/nodes/index");

describe("red/nodes/index", function() {
    it('can be required without errors', function() {
        require("../../../red/nodes/index");
    });
    
   it('should initialise crendentials, flows and registry',function(done) {
       var testFlows = [{"type":"tab","id":"tab1","label":"Sheet 1"}];
        var storage = {
                getFlows: function() {
                    var defer = when.defer();
                    defer.resolve(testFlows);
                    return defer.promise;
                },
                getCredentials: function() {
                    console.log("ONE");
                    return when.promise(function(resolve,reject) {
                        resolve({"tab1":{"b":1,"c":2}});
                    });
                },
                saveFlows: function(conf) {
                    var defer = when.defer();
                    defer.resolve();
                    should.deepEqual(testFlows, conf);
                    return defer.promise;
                },
                saveCredentials: function(creds) {
                    return when(true);
                }
         };
        
        function TestNode(n) {
            this.id = 'tab1';
            this.type = 'abc';
            this.name = 'barney';
            var node = this;

            this.on("log", function() {
                // do nothing
            });
        }
        
        index.init({}, storage);
        index.registerType('test', TestNode);
        var testnode = new TestNode({id:'tab1',type:'abc',name:'barney'});
        index.createNode(testnode,{id:'tab1',type:'abc',name:'barney'});
        index.loadFlows().then(function() {
                should.deepEqual(testFlows, index.getFlows());
                var creds = index.getCredentials("tab1");
                creds.should.have.property('b',1);
                creds.should.have.property('c',2);
                done();
        }).otherwise(function(err) {
            done(err);
        });

    });
   
});

var DEBUG = 'connected'; // null, init, connected

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    onListSuccess: function(objects){
        console.dir(objects);
    },

    onListFail: function(){
        console.error('Failed to list nearby BLE devices.');
    },

    connectSuccess: function(){
        console.log('connectSuccess');
    },

    connectFailure: function(){
        console.log('connectFail');
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('bluetooth-connected', this.onBluetoothConnected, false);
        document.addEventListener('bluetooth-disconnected', this.onBluetoothDisconnected, false);
    },

    onBluetoothConnected: function(){
        app.receivedEvent('bluetooth-connected');
        view.onConnection();
    },

    onBluetoothDisconnected: function(){
        app.receivedEvent('bluetooth-disconnected');
        view.onConnectionInterrupt();
    }, 

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        view.initialize();
        switch(DEBUG){
            case 'connected':
                view.show(view.$form);
                break;
            case 'init':
                view.show(view.$connect);
                break;
            default:
                bluetooth.initialize();
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        app.display('Received Event: ' + id);
        console.log('Received Event: ' + id);
    },

    /*
        appends @error to the message div:
    */
    showError: function(error) {
        app.display(error);
    },

    /*
        appends @message to the message div:
    */
    display: function(message) {
        var display = document.getElementById("message"), // the message div
            lineBreak = document.createElement("br"),     // a line break
            label = document.createTextNode(message);     // create the label

        display.appendChild(lineBreak);          // add a line break
        display.appendChild(label);              // add the message node
    },

    /*
        clears the message div:
    */
    clear: function() {
        var display = document.getElementById("message");
        display.innerHTML = "";
    }
};

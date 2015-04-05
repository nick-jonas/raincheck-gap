/*
Example Return Object:

[{"name": "Tivoli Bluetooth", "address": "00:07:80:12:74:2F", "id": "00:07:80:12:74:2F", "class": 1064}]

*/

var bluetooth = {
	
	initialize: function(){

        var connectEvent = new Event('bluetooth-connected'),
            disconnectEvent = new Event('bluetooth-disconnected');

		// Check to see if Bluetooth is turned on. This function is called only.
        // if isEnabled(), below, returns success:
        var listPorts = function() {
            // list the available BT ports:
            bluetoothSerial.list(
                function(results) {
                    var isConnected = false;
                    for(var i = 0; i < results.length; i++){
                        app.display(results[i].name);
                        if(results[i].name === 'Raincheck'){
                            isConnected = true;
                        }
                    }
                    app.display('-----');
                    // app.clear();
                    // app.display(JSON.stringify(results));
                    if(isConnected){
                        document.dispatchEvent(connectEvent);
                    }else{
                        document.dispatchEvent(disconnectEvent);
                    }
                },
                function(error) {
                    app.display(JSON.stringify(error));
                }
            );
        }

        // if isEnabled returns failure, this function is called:
        var notEnabled = function() {
            app.display("Bluetooth is not enabled.")
        }

        setInterval(function(){
             // check if Bluetooth is on:
            bluetoothSerial.isEnabled(
                listPorts,
                notEnabled
            );
        }, 3000);
	},

	/*
    unsubscribes from any Bluetooth serial listener and changes the button:
    */
    closePort: function() {
        // if you get a good Bluetooth serial connection:
        app.display("Disconnected from: " + app.macAddress);
        // change the button's name:
        connectButton.innerHTML = "Connect";
        // unsubscribe from listening:
        bluetoothSerial.unsubscribe(
                function (data) {
                    app.display(data);
                },
                app.showError
        );
    },


};
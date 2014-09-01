/*global angular*/

angular.module('todomvc').factory('todoBackend', function () {
	'use strict';

	var Backend = function (displayText, port) {
		this.displayText = displayText;
		this.port = port;
	};

	var availableBackends = [
		new Backend('ASP.NET', '9001'),
		new Backend('Scala', '9002')
	];

	// Just choose the first backend in the list by default
	var selectedBackend = availableBackends[0];

	return {
		getAvailableBackends: function () {
			return availableBackends;
		},
		getCurrentBackend: function () {
			return selectedBackend;
		},
		setBackend: function (newBackend) {
			selectedBackend = availableBackends.filter(function(backend) {
				return backend.displayText === newBackend;
			})[0];
		}
	};
});
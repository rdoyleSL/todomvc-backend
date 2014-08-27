/*global angular*/

/**
 * Service to persist and retrieve TODOs from Scala backend
 */
angular.module('todomvc').factory('todoScala', function ($http) {
	'use strict';

	var domain = 'http://localhost:9000/';

	return {
		get: function (callback) {
			$http.get(domain).
				success(function(data) {
					console.log("GET success: " + data);
					callback(data);
				}).
				error(function() {
					console.log("GET error :(");
				});
		},
		post: function (todo) {
			$http.post(domain, todo).
				success(function(data) {
					todo.id = data.id;
					console.log("POST success: " + data);
				}).
				error(function () {
					console.log("POST error :(")
				});
		},
		put: function (todo) {
			$http.put(domain + todo.id, todo).
				success(function(data) {
					console.log("PUT success: " + data);
				}).
				error(function () {
					console.log("PUT error :(")
				});
		},
		remove: function (id) {
			$http.delete(domain + id).
				success(function(data) {
					console.log("DELETE success: " + data);
				}).
				error(function () {
					console.log("DELETE error :(")
				});
		}
	};
})
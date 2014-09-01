/*global angular*/

angular.module('todomvc').factory('todoHttp', function ($http, todoBackend) {
	'use strict';

	var constructAddress = function () {
		return 'http://localhost:' + todoBackend.getCurrentBackend().port + '/todos/';
	};

	return {
		get: function (callback) {
			$http.get(constructAddress()).success(function(data) {
				callback(data);
			});
		},
		post: function (todo) {
			$http.post(constructAddress(), todo).success(function(data) {
				todo.id = data.id;
			});
		},
		put: function (todo) {
			$http.put(constructAddress() + todo.id, todo);
		},
		remove: function (id) {
			$http.delete(constructAddress() + id);
		}
	};
})
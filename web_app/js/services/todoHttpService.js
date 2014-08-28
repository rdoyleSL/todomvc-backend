/*global angular*/

angular.module('todomvc').factory('todoHttp', function ($http) {
	'use strict';

    // The port should be 9001 for ASP.NET or 9000 for Scala
	var api = 'http://localhost:9000/todos/';

	return {
		get: function (callback) {
			$http.get(api).success(function(data) {
				callback(data);
			});
		},
		post: function (todo) {
			$http.post(api, todo).success(function(data) {
				todo.id = data.id;
			});
		},
		put: function (todo) {
			$http.put(api + todo.id, todo);
		},
		remove: function (id) {
			$http.delete(api + id);
		}
	};
})
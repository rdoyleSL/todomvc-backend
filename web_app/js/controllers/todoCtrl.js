/*global angular */

angular.module('todomvc')
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoHttp) {
		'use strict';

		var Todo = function (title, order, completed, id) {
			var self = this;

			this.title = title;
			this.order = order;
			this.completed = completed;
			this.id = id;

			this.toggleCompleted = function () {
				self.completed = !self.completed;
				$scope.updateTodo(self);
			};
		};

		var todos = $scope.todos = [];

		todoHttp.get(function(data) {
			todos = $scope.todos = data.map(function (todo) {
				return new Todo(todo.title, todo.order, todo.completed, todo.id);
			});
		});

		$scope.newTodo = '';
		$scope.editedTodo = null;

		$scope.$watch('todos', function (newValue, oldValue) {
			if (todos) {
				$scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
				$scope.completedCount = todos.length - $scope.remainingCount;
				$scope.allChecked = !$scope.remainingCount;
			}
		}, true);

		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';

			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : null;
		});

		$scope.addTodo = function () {
			var newTodo = $scope.newTodo.trim();
			if (!newTodo.length) {
				return;
			}

            var todo = new Todo(newTodo, todos.length, false);
			todos.push(todo);
			todoHttp.post(todo);

			$scope.newTodo = '';
		};

		$scope.editTodo = function (todo) {
			$scope.editedTodo = todo;
			// Clone the original todo to restore it on demand.
			$scope.originalTodo = angular.extend({}, todo);
		};

		$scope.doneEditing = function (todo) {
			$scope.editedTodo = null;
			todo.title = todo.title.trim();

			if (todo.title) {
				$scope.updateTodo(todo);
			} else {
				$scope.removeTodo(todo);
			}
		};

		$scope.revertEditing = function (todo) {
			todos[todos.indexOf(todo)] = $scope.originalTodo;
			$scope.doneEditing($scope.originalTodo);
		};

		$scope.updateTodo = function (todo) {
			todoHttp.put(todo);
		};

		$scope.removeTodo = function (todo) {
			todos.splice(todos.indexOf(todo), 1);
			todoHttp.remove(todo.id);			
		};

		$scope.clearCompletedTodos = function () {
			todos.forEach(function (todo) {
				if (todo.completed) {
					$scope.removeTodo(todo);
				}
			});
		};

		$scope.markAll = function (completed) {
			todos.forEach(function (todo) {
				todo.toggleCompleted();
			});
		};
	});

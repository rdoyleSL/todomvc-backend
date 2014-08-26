/*global angular */

/**
 * This works with the backend for the most part.
 * There are a couple of things that still need changing:
 * - marking as complete
 * - marking all as complete
 * - clear completed
 */
angular.module('todomvc')
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoScala) {
		'use strict';

		var todos;

		todoScala.get(function(data) {
			todos = $scope.todos = data;
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

            var todo = {
				title: newTodo,
				completed: false,
				order: todos.length
			};
			todos.push(todo);
			todoScala.post(todo);

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
			todoScala.put(todo);

			if (!todo.title) {
				$scope.removeTodo(todo);
				todoScala.remove(todo.id);
			}
		};

		$scope.revertEditing = function (todo) {
			todos[todos.indexOf(todo)] = $scope.originalTodo;
			$scope.doneEditing($scope.originalTodo);
		};

		$scope.removeTodo = function (todo) {
			todos.splice(todos.indexOf(todo), 1);
			todoScala.remove(todo.id);
		};

		$scope.clearCompletedTodos = function () {
			$scope.todos = todos = todos.filter(function (val) {
				return !val.completed;
			});
		};

		$scope.markAll = function (completed) {
			todos.forEach(function (todo) {
				todo.completed = !completed;
			});
		};
	});

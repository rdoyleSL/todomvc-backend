/*global angular */

/**
 * This works with the backend for the most part.
 * There are a couple of things that still need changing:
 * - marking as complete
 * - marking all as complete
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
			todoScala.put(todo);
		}

		$scope.removeTodo = function (todo) {
			todos.splice(todos.indexOf(todo), 1);
			todoScala.remove(todo.id);
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
				todo.completed = !completed;
			});
		};
	});

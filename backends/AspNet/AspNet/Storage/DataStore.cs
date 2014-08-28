using System.Collections.Generic;
using System.Linq;
using AspNet.Models;

namespace AspNet.Storage
{
    public class DataStore : IDataStore
    {
        private static long nextId = 0;
        private static List<Todo> todos = new List<Todo>();

        public IEnumerable<Todo> GetAll()
        {
            return todos;
        }

        public Todo Add(Todo todo)
        {
            todo.Id = nextId++;
            todos.Add(todo);
            return todo;
        }

        public Todo Update(long id, Todo todo)
        {
            var updateTodo = todos.First(t => t.Id == id);
            updateTodo.Title = todo.Title;
            updateTodo.Completed = todo.Completed;
            updateTodo.Order = todo.Order;

            return updateTodo;
        }

        public void Delete(long id)
        {
            todos.RemoveAll(t => t.Id == id);
        }
    }
}

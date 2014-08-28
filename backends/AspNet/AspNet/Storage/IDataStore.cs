using System.Collections.Generic;
using AspNet.Models;

namespace AspNet.Storage
{
    public interface IDataStore
    {
        IEnumerable<Todo> GetAll();
        Todo Add(Todo todo);
        Todo Update(long id, Todo todo);
        void Delete(long id);
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AspNet.Models;
using AspNet.Storage;

namespace AspNet.Controllers
{
    public class TodosController : ApiController
    {
        private IDataStore dataStore = new DataStore();

        [HttpGet]
        public IEnumerable<Todo> GetAll()
        {
            return this.dataStore.GetAll();
        }

        [HttpPost]
        public Todo Add([FromBody] Todo todo)
        {
            return this.dataStore.Add(todo);
        }

        [HttpPut]
        public Todo Update(long id, [FromBody] Todo todo)
        {
            return this.dataStore.Update(id, todo);
        }

        [HttpDelete]
        public void Delete(long id)
        {
            this.dataStore.Delete(id);
        }
    }
}

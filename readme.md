Various backend implementations of the Todo-MVC app.

# Running TodoMVC-backend locally

The default method to host the front-end code is through Node.
This can be done via the command line by navigating to the web_app folder and running *'node server.js'*.

# Developing TodoMVC-backend

## Adding Backends

Each back-end must implement the same API. There are four Http requests that they must handle. All data should be returned in the JSON format. Each todo should take the following format:
{ id: 5, title: 'item5', completed: true, order: 2}

### GET /todos
Returns all the todos in the data store.

### POST /todos
Adds the todo posted in the HTTP body to the data store. A unique id should be generated and added to the todo. The added todo (with the generated id number) should be returned.

### UPDATE /todos/:id
Updates the todo with the specified id with the todo specified in the HTTP body. The updated todo should be returned.

### DELETE /todos/:id
Deletes the todo with the specified id from the data store.


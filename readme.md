Various backend implementations of the Todo-MVC app.

# Running TodoMVC-backend locally

The whole project can be run by running the *'runTodos.sh'* script in the root folder. There are some set-up steps required for each back end documented below.

## Frontend
The default method to host the front-end code is through Node.
This can be done via the command line by navigating to the web_app folder and running *'node server.js'*.

## Scala-Play
To run the scala-play project you need to install the Play framework such that the *'activator'* command is available from the command line.

## Asp.Net
To run the Asp.Net backend you currently need to run the project in Debug mode in Visual Studio such that there is a valid executable available in the *bin/debug* folder.

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


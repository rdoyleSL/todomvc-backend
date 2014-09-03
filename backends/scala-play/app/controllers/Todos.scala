package controllers

import play.api.mvc.{Result, Action, Controller}
import play.api.libs.json.Json._
import models.Todo
import storage.DataStore

object Todos extends Controller {

  def index = Action {
    Ok(toJson(DataStore.getAll))
  }

  def update(id: Long) = TodoAction { todo =>
    Ok(toJson(Some(DataStore.update(id, todo))))
  }

  def add = TodoAction { todo =>
    Ok(toJson(Some(DataStore.add(todo))))
  }

  def delete(id: Long) = Action {
    Ok(toJson(DataStore.delete(id)))
  }

  def options(path: String) = Action {
    Ok("")
  }

  private def TodoAction(operation: Todo => Result) = Action(parse.json) { request =>
    Todo.form.bind(request.body).fold(
      errors => BadRequest(errors.errorsAsJson),
      todo => operation(todo)
    )
  }
}
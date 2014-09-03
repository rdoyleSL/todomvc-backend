package controllers

import play.api.mvc.{Result, Action, Controller}
import play.api.libs.json.Json._
import models.Todo
import storage.DataStore

/*
 * This file could do with some tidying up, the headers will not be needed
 * if this is all served from the same domain
 */
object Todos extends Controller {

  def index = Action {
    Ok(toJson(DataStore.getAll)).withHeaders("Access-Control-Allow-Origin" -> "*")
  }

  def update(id: Long) = TodoAction { todo =>
    Ok(toJson(Some(DataStore.update(id, todo)))).withHeaders("Access-Control-Allow-Origin" -> "*")
  }

  def add = TodoAction { todo =>
    Ok(toJson(Some(DataStore.add(todo)))).withHeaders("Access-Control-Allow-Origin" -> "*")
  }

  def delete(id: Long) = Action {
    Ok(toJson(DataStore.delete(id))).withHeaders("Access-Control-Allow-Origin" -> "*")
  }

  def options(path: String) = Action {
    Ok("").withHeaders(
      "Access-Control-Allow-Origin" -> "*",
      "Access-Control-Allow-Methods" -> "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers" -> "Accept, Origin, Content-type, X-Json, X-Prototype-Version, X-Requested-With",
      "Access-Control-Allow-Credentials" -> "true",
      "Access-Control-Max-Age" -> (60 * 60 * 24).toString
    )
  }

  private def TodoAction(operation: Todo => Result) = Action(parse.json) { request =>
    Todo.form.bind(request.body).fold(
      errors => BadRequest(errors.errorsAsJson).withHeaders("Access-Control-Allow-Origin" -> "*"),
      todo => operation(todo)
    )
  }
}
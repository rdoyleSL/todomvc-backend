package models

import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.{JsValue, Writes, Json}

case class Todo(id: Long, title: String, order: Int, completed: Boolean)

object Todo {
	val form = Form(
	  mapping(
	    "id" -> ignored(0L),
	    "title" -> nonEmptyText,
	    "order" -> number,
	    "completed" -> boolean
	  )(Todo.apply)
	    (Todo.unapply)
	)

	/*
	* This method allows us to serialize the object
	* into JSON in the contoller methods
	*/
	implicit object todoWrites extends Writes[Todo] {
		def writes(t: Todo): JsValue = {
			Json.obj(
				"id" -> t.id,
				"title" -> t.title,
				"order" -> t.order,
				"completed" -> t.completed
			)
		}
	}
}
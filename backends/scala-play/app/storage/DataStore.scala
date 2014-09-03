package storage

import models.Todo
import collection.mutable.ArrayBuffer

object DataStore {
  private val idGenerator = new IdGenerator
  private val store = new ArrayBuffer[Todo]

  def getAll = store.toList

  def add(data: Todo): Todo = {
    val todo = data.copy(id = idGenerator.getId)
    store += todo
    todo
  }

  def update(id: Long, data: Todo): Todo = {
    var index = store.indexWhere(_.id == id)
    /* We need to explicitly set the id here, since it is
       ignored on the model for the post request */
    store(index) = data.copy(id = id)
    data
  }

  def delete(id: Long) = {
    var index = store.indexWhere(_.id == id)
    store.remove(index)
  }
}



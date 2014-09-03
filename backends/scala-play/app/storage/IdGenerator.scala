package storage

import java.util.concurrent.atomic.AtomicLong

class IdGenerator {
  private val generator = new AtomicLong(1)
  def getId = generator.getAndIncrement()
}
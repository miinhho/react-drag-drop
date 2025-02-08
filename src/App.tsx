import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { useState } from "react"
import Column from "./components/Column"
import { COLUMNS, INITIAL_TASKS } from "./constants"
import { Task } from "./types"

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Task['status']

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            status: newStatus
          }
          : task,
      ))
  }

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  )
}

export default App
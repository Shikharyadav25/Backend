import express from 'express'
import db from '../db.js'

const router = express.Router()

// Get all todos for logged-in user
router.get('/', (req, res) => {
    if (!Number.isInteger(req.userId)) {
        return res.status(401).json({ message: 'User not authenticated' })
    }

    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

// Create a new todo
router.post('/', (req, res) => {
    if (!Number.isInteger(req.userId)) {
        return res.status(401).json({ message: 'User not authenticated' })
    }

    const { task } = req.body
    const insertTodo = db.prepare('INSERT INTO todos (user_id, task) VALUES (?, ?)')
    const result = insertTodo.run(req.userId, task)

    res.json({ id: result.lastInsertRowid, task, completed: 0 })
})

// Update a todo
router.put('/:id', (req, res) => {
    if (!Number.isInteger(req.userId)) {
        return res.status(401).json({ message: 'User not authenticated' })
    }

    const { completed } = req.body
    const id = Number(req.params.id)

    const updatedTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ? AND user_id = ?')
    updatedTodo.run(completed, id, req.userId)

    res.json({ message: 'Todo completed' })
})

// Delete a todo
router.delete('/:id', (req, res) => {
    if (!Number.isInteger(req.userId)) {
        return res.status(401).json({ message: 'User not authenticated' })
    }

    const id = Number(req.params.id)
    const deleteTodo = db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?')
    deleteTodo.run(id, req.userId)

    res.send({ message: 'Todo deleted' })
})

export default router
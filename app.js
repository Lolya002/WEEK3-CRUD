// Load Environment

require("dotenv").config()

const express = require("express")
const app = express()

// Body parsing Middleware
app.use(express.json())

let todos = [
    {id : 1, task : "Learn node.js", completed : false},
    {id : 2, task : "Build CRUD API", completed : false},
];

// Get all todo

app.get("/todos", (req, res) => {
    res.status(200).json(todos)
})

//Post (Create new todo)

app.post("/todos", (req, res) => {
     // ✅ Simple manual validation
    const { task, completed } = req.body;
       
      if (!task || task.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Task is required"
        });
    }
    const newTodo = {id : todos.length + 1, task, completed: completed || false}
    todos.push(newTodo)
    res.status(201).json({message:"Todo created succesfully",data:newTodo})


})

// Patch(Edit todo)

app.patch("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const todo = todos.find((t) => t.id === id);  // Array.find t
    if(!todo) return res.status(404).json({message : "Todo not found"})
    Object.assign(todo, req.body)
    res.status(200).json(todo)
})

// Delete(Delete todo)

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const initialLength = todos.length
    todos = todos.filter((t) => t.id !== id)  // Array.filter- non destructive, to remove the item with that id
    if(todos.length === initialLength)
         return res.status(404).json({message : "Not found"})
    res.status(204).json({message : "Delete Sucessful"})  // Delete success
})

// Get specific todo

app.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const todo = todos.find((t) => t.id === id)
    if(!todo) return res.status(404).json({message : "Id not found"})
    res.status(200).json(todo)
})

app.get("/todos/active", (req, res) => {
    const completed = todos.filter((t) => t.completed)
    res.json(completed)  // Custom Read
})

// Server Error

app.use((err, req, res, next) => {
    res.status(500).json({error : "Server Error!!"})
})
 



// localhost

const port = process.env.port || 4000

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)

})


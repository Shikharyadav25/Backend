import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 3000

//getting file path from URL of current module
const __filename = fileURLToPath(import.meta.url)
//getting directory name from file path
const __dirname = dirname(__filename)


//Middleware
//serves the HTML files from the public directory and tells express to serve all files from public folder as static assets / file. Any requests for the css files will be resolved to the public directory.
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
//serving up HTML file from /public directory 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
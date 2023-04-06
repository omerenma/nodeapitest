import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {userRoute} from './routes/index.js'
const app = express();
const port = 8000

dotenv.config()
app.use(express.json())
app.use(cors())
app.use('api/users', userRoute)

app.listen(port || process.env.PORT  ,() => {
    console.log(`Express server running on port ${port}`)
})

export default app
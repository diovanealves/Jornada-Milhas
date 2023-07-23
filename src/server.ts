import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import userRoutes from './routes/UserRoutes'

const PORT = process.env.PORT || 8888

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }),
)

app.use(userRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`)
})

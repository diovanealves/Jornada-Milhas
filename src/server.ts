import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import userRoutes from './routes/UserRoutes'
import testimonialRoutes from './routes/TestimonialRoutes'
import destinationRoutes from './routes/DestinationRoutes'

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
app.use(testimonialRoutes)
app.use(destinationRoutes)

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`)
})

const closeServer = () => {
  server.close()
  console.log('Server closed')
}

export { app, closeServer }

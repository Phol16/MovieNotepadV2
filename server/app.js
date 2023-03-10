import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import errors from './controller/errors/error.js'
import users from './routes/users.js'
import movies from './routes/movies.js'
import watchList from './routes/watchList.js'
import notes from './routes/notes.js'
import initialfetch from './controller/initialFetch.js'
import CloudinaryService from './utils/CloudinaryService.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express()

app.use(express.json({limit: '5MB'}))
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.set(CloudinaryService.serviceName, new CloudinaryService(
  process.env.CLOUDNAME,
  process.env.CLOUDAPIKEY,
  process.env.CLOUDAPISECRET,
))

app.use('/users', users)
app.use('/movies', movies)
app.use('/watchList', watchList)
app.use('/notes', notes)
app.get('/', initialfetch)


app.use(errors, (req, res)=>{
  res.status(404).json({
    status:'failed',
    message:'page not found'
  })
})

export default app
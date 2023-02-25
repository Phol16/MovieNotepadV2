import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import errors from './controller/errors/error.js'
import users from './routes/users.js'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(cors())
app.use(morgan('dev'))

app.use('/users', users)


app.use(errors, (req, res)=>{
  res.status(404).json({
    status:'failed',
    message:'page not found'
  })
})

export default app
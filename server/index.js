import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
 
// parse application/json
app.use(express.json({ extended: false }));

app.use(cors());

app.use('/',routes);

app.listen(process.env.PORT || 5000,()=>{
    console.log('Server running on 5000')
})


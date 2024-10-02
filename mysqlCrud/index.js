const express = require('express');
const mysqlPool = require('./config/db');
// const mysqlConnection = require('./config/db');
const app = express();
const port = 3000;

app.use(express.json());


app.use('/api/students', require('./routes/studentsRoutes'));

// app.get('/employees', (req, res) => {
//     console.log('hello world');
//     res.send('hello')
// });

mysqlPool.query('SELECT 1').then(()=>{
console.log('mysql DB Connected');
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
})




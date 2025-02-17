const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

const port = 8000;

app.use(bodyParser.json());

let users = []

let conn = null
const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8850
    })
}

// path = GET /users สำหรับ get user ทั้งหมดที่บันทีกไว้
app.get('/users', async (req, res) => {
    const result = await conn.query('SELECT * FROM users')
    res.json(result[0])
})


// path = post /user ใช้สำหรับสร้างข้อมูล user ใหม่

app.post('/users', async(req, res) => { 
    let user = req.body;
    const result = conn.query('INSERT INTO user SET ?',   users) 
    console.log ('results', result)
    res.json({
        message: 'Create user successfully',
        data: result[0]
    })

})



// path = GET /users สำหรับ get user ทั้งหมดที่บันทีกไว้
app.get('/users/: id', (req, res) => {
    let id = req.params.id;
    let selectedUser = users.find(user => user.id == id);

    res.json(users[selectedIndex]);
})


// path:PUT /users/:id ใช้สำหรับเเก้ไขข้อมูล user โดยใช้ id เป็นตัวระบุ
// get post put ใช้ได้หมด
app.put('/users/:id', (req, res) => {
    let id = req.params.id; 
    let updateUser = req.body;
    let selectedIndex = users.findIndex(user => user.id == id );
    
        users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname;
        users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname;
        users[selectedIndex].age = updateUser.age || users[selectedIndex].age;
        users[selectedIndex].gender = updateUser.gender || users[selectedIndex].gender
    
    res.json({
        message: 'Update user successfully',
        data:{
            user: updateUser,
            indexUpdated : selectedIndex
        }
    }) 
    res.send(id) 
})

//path: DELETE /user/:id ใช้สำหรับลบข้อมูล user โดยใช้ id เป็นตัวระบุ
app.delete('/users/:id', (req, res) => {
    let id = req.params.id;
    let selectedIndex = users.findIndex(user => user.id == id);})

app.listen(port, async () => {
    await initMySQL();
    console.log('HTTP Server is running on port '+{port});
});
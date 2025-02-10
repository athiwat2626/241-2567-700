/*
const http = require('http'); // Import Node.js core module

const host = 'localhost'; // Localhost

const port = 8000; // Port number

// เมื่อเปิด เว็บไปที่ http://localhost:8000/ จะเรียกใช้งาน function requireListener
const requireListener = function (req, res) {
    res.writeHead(200);
    res.end('My first server!');
}

const server = http.createServer(requireListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`); // ` ` แบล้คติ้ก เอาสตรีงกับตัวแปรมาใส่ได้เลย
});
*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8000;

app.use(bodyParser.json());

let users = [];
let counter = 1
// path: /users ใช้สำหรับการเเสดงข้อมูล user ทั้งหมด
app.get('/users', (req, res) => {
    res.json(users); 
});

// path: /user ใช้สำหรับการสร้างข้อมูล user ใหม่บันทึกเข้าไป
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter 
    counter += 1
    users.push(user);
    res.json({
        message: 'Create new user successfully',
        user : user
    });
})
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;  

    //หา users จาก id ที่เจอ
    let selectIndex = users.findIndex(user =>  user.id == id)
     
    // แก้ไขข้อมูล user
    if (updateUser.firstname){
        users[selectIndex].firstname = updateUser.firstname;
    }
    if (updateUser.lastname){
        users[selectIndex].lastname = updateUser.lastname;    
    }

    res.json({
        message: 'Update user successfully',
        data:   {
    
            user: updateUser,
            indexUpdated: selectIndex
        }
    });
})

///path: DELETE /user/:id ใช้สำหรับการลบข้อมูล user ที่มี id ตามที่ระบุ
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    //หา index ของ user ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id);
    
    //ลบ
    users.splice(selectedIndex, 1)
    res.json({
        message: 'Delete user successfully',
        indexDeleted: selectedIndex
    })
})



app.listen(port, (req,res) => {
    console.log('Http Server is running on port' +port);
});

//cd change directory
//ls list
//pwd print working directory
// cd.. กลับไปที่ directory ก่อนหน้า go back 
// exit ออกจาก terminal
//docker stop <container id> หยุด container
//docker system prune -a ลบ container ทั้งหมด
//docker -compose up รัน container
//docker-compose down หยุด container


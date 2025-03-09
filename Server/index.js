const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();


const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let users = [];
let conn = null;

// ฟังก์ชันเชื่อมต่อ MySQL
const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8821
    });
};

const validateData = (userData) => {
    let errors = []
    
     if (!userData.firstname){
        errors.push('กรุณากรอกชื่อ')
      }
      if (!userData.lastname){
        errors.push('กรุณากรอกนามสกุล')
      }
      if (!userData.age){
        errors.push('กรุณากรอกอายุ')
      }
      if (!userData.gender){
        errors.push('กรุณากรอกเพศ')
      }
      if (!userData.interests){
        errors.push('กรุณากรอกคสามสนใจ')
      }
      if (!userData.description){
        errors.push('กรุณากรอกคำอธิบาย')
      }
      return errors
    }
    

// GET /users - ดึง Users ทั้งหมด
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
});

// POST /users - เพิ่ม Users ใหม่
app.post('/users', async (req, res) => {
    let user = req.body;
    try{
        let user = req.body;
        const errors = validateData(user)
        if(errors.length > 0){
            throw {
                message:'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors:errors
            }
        }
        const results = await conn.query('INSERT INTO users SET ?', user);
        res.json({
                message: 'Create user successfully',
                data: results[0]
    })
    }catch(error){
        const errorMessage = error.message || 'something went wrong'
        const errors = error.errors || []
        console.error('error',error.message)
        res.status(500).json({
            message:errorMassage,
            errors: errors
        }
        )} 
});
// GET /users/:id - ดึง Users ตาม ID
app.get('/users', async (req, res) => {
    try{
    let id = req.params.id;
    const results = await conn.query('SELECT * FROM users where id = ?', id)
    if(results[0].length > 0){
        throw {statusCode: 404, message: 'User not found'}
    }
    res.json(results[0][0]);
    }catch(error){
        console.error('error:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(500).json({
            message:'something went wrong',
            errorMessage: error.message
        } )
    }
})

// PUT /users/:id - อัปเดตข้อมูล Users ตาม ID
app.put('/users/:id', async (req, res) => {
    try{
        let id = req.params.id;
        let updateUser = req.body;
        const results = await conn.query('UPDATE user SET ? WHERE id = ? ', 
            [updateUser, id]
        )
        res.json({
                message: 'Update user successfully',
                data: results[0]
    })
    }catch(error){
        console.error('error:', error.message);
        res.status(500).json({
            message:'something went wrong',
            errorMessage: error.message
        })
      }  

     })

// DELETE /users/:id - ลบ Users ตาม ID
app.delete('/users/:id', async (req, res) => {
        try{
            let id = req.params.id;
            const results = await conn.query('DELETE from user WHERE id = ? ',id)
            res.json({
                    message: 'Delete user successfully',
                    data: results[0]
            })
        }catch(error){
            console.error('error:', error.message);
            res.status(500).json({
                message:'something went wrong',
                errorMessage: error.message
            })
          }  
        })

// เริ่มเซิร์ฟเวอร์และเชื่อมต่อฐานข้อมูล
app.listen(port, async () => {
    await initMySQL();
    console.log('Http Server is running on port ' + port);
});


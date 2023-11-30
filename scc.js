const mysql = require('mysql');
const axios = require('axios');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 't001'
});

con.connect((err)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log('Connected');
  }
});
//CHECK CONNECTED

function saveData() {
  let q = 'truncate table p001';
  con.query(q,(err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log('Deleted');
      setInterval(saveData, 30000); //ตั้งให้ saveData function ทำซ้ำๆทุก 30 วินาที
      axios.get('https://randomuser.me/api/?results=10')//ใช้ axios เรียกข้อมูล json
      .then((res)=>{
        let b = res.data.results; //สร้างตัวแปร b
        b.forEach((item)=>{
          let query = `insert into p001 (name) values ('${item.name.first}')`;
          con.query(query,(err,result)=>{
            if(err){
              console.log(err);
            }
            else{
              console.log('Saved');
            }
          })
        })
      })
      .catch(error => console.error(error));
    }
  });
}

saveData(); // เรียกใช้ฟังก์ชั่นทันทีเมื่อโปรแกรมเริ่มทำงาน

//setInterval(saveData, 30000); // เรียกใช้ฟังก์ชั่นทุก 30 วินาที

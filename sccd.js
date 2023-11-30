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

function saveData() {
  let q = 'truncate table p001';
  con.query(q,(err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log('Deleted');
      axios.get('https://randomuser.me/api/?results=20')
      .then((res)=>{
        let b = res.data.results;
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

setInterval(saveData, 60000); // เรียกใช้ฟังก์ชั่นทุก 30 วินาที

const BASE_URL = "http://localhost:8000";
window.onload = async () => {
    await loadData()
}

window.onload = async () => {
    
}
const loadData = async () => {
console.log("user page loaded");
    // 1.โหลดuserจากapiที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/users`);

    console.log(response.data)
    const userDOM = document.getElementById("user-list");
    let htmlData = '<div>'
    // 2.นำuser ทั้งหมด โหลดกลับเข้าไปในhtml
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += `<div>
    ${user.id}${user.firstname}${user.lastname}
    <a href = 'index.html?id=${user.id}'><button>Edit</button></a>
    <button class = 'delete' data-id = '${user.id}'>Delete</button>
    </div>`
  }
  htmlData += '</div>'
  userDOM.innerHTML = htmlData;
  // 3.ลบuser
    const deleteDOMs = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener("click", async (event) => {
            //ดึงไอดีของuser ที่ต้องการลบ
            const id = event.target.dataset.id;
        try{
            await axios.delete(`${BASE_URL}/users/${id}`);
            loadData()//recursive function = เรียกใช้ฟังก์ชันตัวเอง
        }catch(error){
            console.log('error',error);
           }
        });
    }
}

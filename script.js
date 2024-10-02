const addUserBtn = document.getElementById("addUser");
const btnText = addUserBtn.innerHTML;
const usernameTextFeild = document.getElementById("username");
const recordsDisplay = document.getElementById("records");
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');

if(objStr!=null){
   userArray = JSON.parse(objStr);
}
DisplayInfo();
addUserBtn.onclick=()=>{
     const name = usernameTextFeild.value;
    if(edit_id!=null){
       userArray.splice(edit_id,1,{'name': name});
       edit_id=null;
    }
    else{
        
    userArray.push({'name': name});
    }
   
    SaveInfo(userArray);
    usernameTextFeild.value='';
   
    addUserBtn.innerHTML = btnText;
}

function SaveInfo(userArray){
    let str = JSON.stringify(userArray);
    localStorage.setItem('users',str);
    DisplayInfo();
}

function DisplayInfo(){
  let statement = '';
  userArray.forEach((user,i) => {
    statement +=`<tr>
    <th scope="row">${i+1}</th>
    <td>${user.name}</td>
    <td></i><i class="btn text-white fa fa-edit btn-info mx-2" onclick = 'EditInfo(${i})'></i><i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})' ></td>
  </tr>`
  });

  recordsDisplay.innerHTML = statement;
}
function EditInfo(id){
   edit_id = id;
   usernameTextFeild.value = userArray[id].name;
   addUserBtn.innerHTML = `Save Changes`;
}
function DeleteInfo(id){
  userArray.splice(id,1);
  SaveInfo(userArray);
}
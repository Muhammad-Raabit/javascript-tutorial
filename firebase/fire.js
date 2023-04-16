
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
// import {getDatabase }  from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyAZ1Dv4G2x11px7qgRY7xELK1Y6cT4D_j4",
    authDomain: "myapp-728b0.firebaseapp.com",
    databaseURL: "https://myapp-728b0-default-rtdb.firebaseio.com",
    projectId: "myapp-728b0",
    storageBucket: "myapp-728b0.appspot.com",
    messagingSenderId: "160392662989",
    appId: "1:160392662989:web:439a14f8699f6525dafe84"
  };

  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

//  const app = initializeApp(firebaseConfig);
//    const database = getDatabase(app);


let btn = document.querySelector("button");

btn.addEventListener("click",(e)=>{
let roll = document.getElementById("roll");    
let name = document.getElementById("name");

let key = firebase.database().ref("student").push().key;

let student = {
name:name.value,
roll:roll.value,
key : key
}    

//  firebase.database().ref("student/student1").set(student);
// firebase.database().ref("student").child("student1").push(student);
firebase.database().ref("student/"+key).set(student);
})

function getData(){
// firebase.database().ref("student").once("value",(data)=>{
//   console.log(data.val());
// })
firebase.database().ref("student").on("child_added",function(data){
  console.log(data.val());
})
}

function removeItem(){
  firebase.database().ref("student/-NPmpiZKY1IVpKEEFdEN").remove();
}
function editData(){
  firebase.database().ref("student/-NPmppqSOoFis2jF2PrX").set({
    key:"-NPmppqSOoFis2jF2PrX",
    name:"Saqib",
    roll:123
  })
}
getData();

removeItem()
editData()
import { email, student } from "./modules/student.js";
import { email as teacher_email, teacher } from "./modules/teacher.js";

student(function () {
  console.log("Student Email :" + email);
});


window.onload=teacher(function(){
    console.log("Teacher Email :" + teacher_email);

})
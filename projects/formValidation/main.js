let id = (id) => document.getElementById(id);
let classes = (classes) => document.querySelectorAll(classes);

let userName = id("username"),
  email = id("email"),
  password = id("password"),
  form = id("form"),
  errorMsg = classes(".error"),
  failureIcon = classes(".failure-icon"),
  successIcon = classes(".success-icon");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  engine(userName,0,"username Cannot be Blank")
  engine(email,1,"Email Cannot be Blank")
  engine(password,2,"Password Cannot be Blank")
});

let engine = (id, serial, message) => {
  if (id.value.trim() === "") {
    errorMsg[serial].textContent = message;
    failureIcon[serial].style.opacity = "1";
    successIcon[serial].style.opacity ="0"
  } else {
    errorMsg[serial].textContent = "";
    failureIcon[serial].style.opacity = "0";
    successIcon[serial].style.opacity = "1";
  }
};

console.log("hello world")

const signup = document.querySelector("#signup")
const username = document.querySelector("#form3Example1c")
const useremail = document.querySelector("#form3Example3c")
const password = document.querySelector("#form3Example4c")
const bedtime = document.querySelector("#form3Example4cd")
const firstname = document.querySelector("#form3Example6c")
const lastname = document.querySelector("#form3Example7c")

signup.addEventListener("submit", async function (event){
    event.preventDefault ()
    console.log (username.value,useremail.value, firstname.value, lastname.value)
  const response = await fetch ("/signup", {
    method:"post",
    body:JSON.stringify({
        user_name:username.value ,
        password:password.value ,
        first_name:firstname.value ,
        last_name:lastname.value,
        email:useremail.value,
        bed_time:bedtime.value
    })
  })
  const data= response.json()
  console.log  (data) 
})
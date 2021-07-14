# Google ClasRoom Clone.

_*This Project is Clone of Google ClassRoom . Build with **MURN** techonology.*_

---
## Front End 
_Fornt end is made in *`React.js`*_

--- 
### Let's have a look on front end .
1. ![First screen](./Images/1.png)
2. ![SignUp screen](./Images/2.png)
3. ![LogIn screen](./Images/3.png)
4. ![SignUp screen](./Images/4.png)
5. ![First screen](./Images/5.png)
6. ![SignUp screen](./Images/6.png)
7. ![First screen](./Images/7.png)

---
## Back End 
_Back end is made in *`Node.js`* , I used *`express.js`* and *`socket.io`* for server and many other liberaries for other purpose. plese check dependencies in *`Project_Backend`* folder._

---
### Security ,Authorization and Authentication.
_I have tried to apply all good practices like hashing the passwors before saving in the database . I used *`bcrypt`* liberary for this and user Authentication with each type of api request (get,post,put,delete) ._

_I used *`JWT Authentication`* Technique for Login and continues checking for authentication of user._

### Backend API 
---
### _signup as teacher_

`POST  http://localhost:3001/signup/t `
```json
Content-Type: application/json
{
    "name":"Mayank",
    "pass":"aryan",
    "email":"Mayan@gmail",
    "phone":"8904849210",
    "classes":[]
}
```
---
### _signup as student_

`POST  http://localhost:3001/signup/s `
```json
Content-Type: application/json

{
    "name":"Aryan",
    "pass":"aryan",
    "email":"Aryan@gmail",
    "phone":"9305937113",
    "classes":[]
}
```

### login as a teacher
`POST  http://localhost:3001/login/t`
```json
Content-Type: application/json

{
   "pass":"aryan",
    "email":"Mayan@gmail"
   
}
```

---
### login as a student
`POST  http://localhost:3001/login/s`
```json
Content-Type: application/json

{
   "pass":"aryan",
    "email":"Aryan@gmail"
   
}
```
---
### get user
`GET  http://localhost:3001/login/getuser`
`authToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzU3YWZkZjc5NjMyMDY3NmU1ODRiYiIsImlhdCI6MTYyMzU1NDg0NSwiZXhwIjoxNjIzNTU0OTA1fQ.vWMiEPrMb-wQeqFLZ0O3HfzUYXR7UXj3515IltUrf5Y`

---

### Create New Class
`POST  http://localhost:3001/class/create`
```json
Content-Type: application/json

{
   "name":"Python",
   "desc":"This is a Pyhon Class",
   "authToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzU3OTgzNTkxZDFmMDYxMzYyM2I5NiIsImlhdCI6MTYyMzU1NDY4NCwiZXhwIjoxNjIzNTU0NzQ0fQ.ojAVeIIliuCv96HutvqiA7_Cd5xumNZi4OLxvJVIbKM"
}
```
---
### Join New Class
`POST  http://localhost:3001/class/join`
```json
Content-Type: application/json

{
   "id":"60c57a50d98300062ac41656",
   "authToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzU3YWZkZjc5NjMyMDY3NmU1ODRiYiIsImlhdCI6MTYyMzU1NTA1MiwiZXhwIjoxNjIzNTU1MTEyfQ.a3ojCV9GL5HONPCS04ZoTcLcgS4Yq1pwCecq01ZQWfI"
}
```
---
### get All Classes of teacher
`GET   http://localhost:3001/class/t`

`authToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzU3OTgzNTkxZDFmMDYxMzYyM2I5NiIsImlhdCI6MTYyMzU1NDY4NCwiZXhwIjoxNjIzNTU0NzQ0fQ.ojAVeIIliuCv96HutvqiA7_Cd5xumNZi4OLxvJVIbKM`

---
### get All Classes of student
`GET   http://localhost:3001/class/s`

`authToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzU3YWZkZjc5NjMyMDY3NmU1ODRiYiIsImlhdCI6MTYyMzU1NTA1MiwiZXhwIjoxNjIzNTU1MTEyfQ.a3ojCV9GL5HONPCS04ZoTcLcgS4Yq1pwCecq01ZQWfI`


---
### remove a class from student list.
`PUT   http://localhost:3001/class/leave`
```json
Content-Type: application/json

{
   "id":"60c382f6b40db904de19383b",
   "authToken" : ""
}
```
---
### remove and delete class from Teacher list.
`PUT   http://localhost:3001/class/delete`
```json
Content-Type: application/json

{
   "id":"60c382f6b40db904de19383b",
   "authToken" : ""
}
```
---
### get class material
`GET http://localhost:3001/material/info/60c58d82f64371099498e276`


`authToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzU3OTgzNTkxZDFmMDYxMzYyM2I5NiIsImlhdCI6MTYyMzU2MDU1NSwiZXhwIjoxNjIzNjQ2OTU1fQ.fCUqjwHPLRdFENkXsXj9NnYZU0b_h-8j3K-hZyHJlfc`

---

## DataBase
_*MongoDB*_


----
----
# Contact Info
![Contact Info](./Images/Contact.svg)
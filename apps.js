let uploadedImage = null

function showPage(id){

document.querySelectorAll(".page").forEach(page=>{
page.classList.remove("active")
})

document.getElementById(id).classList.add("active")

}

function applyTheme(){

let bg=document.getElementById("bgColor").value
let text=document.getElementById("textColor").value

document.body.style.backgroundColor=bg
document.body.style.color=text

localStorage.setItem("bg",bg)
localStorage.setItem("text",text)

}

function resetTheme(){

document.body.style.backgroundColor=""
document.body.style.color="white"

localStorage.removeItem("bg")
localStorage.removeItem("text")

}

function randomTheme(){

let r=()=>Math.floor(Math.random()*255)

let color=`rgb(${r()},${r()},${r()})`

document.body.style.backgroundColor=color

}

window.onload=()=>{

let bg=localStorage.getItem("bg")
let text=localStorage.getItem("text")

if(bg) document.body.style.backgroundColor=bg
if(text) document.body.style.color=text

}

function generateUsername(){

let len=document.getElementById("nameLength").value
let style=document.getElementById("nameStyle").value

let chars="abcdefghijklmnopqrstuvwxyz0123456789"
let name=""

if(style==="random"){

for(let i=0;i<len;i++)
name+=chars[Math.floor(Math.random()*chars.length)]

}

if(style==="gamer"){

let words=["Shadow","Nova","Ghost","Reaper","Pixel","Storm"]
name=words[Math.floor(Math.random()*words.length)]+Math.floor(Math.random()*9999)

}

if(style==="cool"){

let words=["Vortex","Cipher","Phantom","Neon","Blaze"]
name=words[Math.floor(Math.random()*words.length)]

}

document.getElementById("nameOutput").innerText=name

}

document.getElementById("upload").addEventListener("change",e=>{

let reader=new FileReader()

reader.onload=event=>{

let img=new Image()

img.onload=()=>{

uploadedImage=img

let c=document.getElementById("original")
let ctx=c.getContext("2d")

c.width=img.width
c.height=img.height

ctx.drawImage(img,0,0)

}

img.src=event.target.result

}

reader.readAsDataURL(e.target.files[0])

})

function hexToRgb(hex){

return{
r:parseInt(hex.substr(1,2),16),
g:parseInt(hex.substr(3,2),16),
b:parseInt(hex.substr(5,2),16)
}

}

function removeBackground(){

if(!uploadedImage) return

let color=hexToRgb(document.getElementById("removeColor").value)
let tol=document.getElementById("tolerance").value

let c=document.getElementById("result")
let ctx=c.getContext("2d")

c.width=uploadedImage.width
c.height=uploadedImage.height

ctx.drawImage(uploadedImage,0,0)

let img=ctx.getImageData(0,0,c.width,c.height)
let d=img.data

for(let i=0;i<d.length;i+=4){

if(
Math.abs(d[i]-color.r)<tol &&
Math.abs(d[i+1]-color.g)<tol &&
Math.abs(d[i+2]-color.b)<tol
){
d[i+3]=0
}

}

ctx.putImageData(img,0,0)

}

function clearCanvas(){

let o=document.getElementById("original")
let r=document.getElementById("result")

o.getContext("2d").clearRect(0,0,o.width,o.height)
r.getContext("2d").clearRect(0,0,r.width,r.height)

}

function downloadImage(){

let canvas=document.getElementById("result")

let link=document.createElement("a")
link.download="reoveons-image.png"
link.href=canvas.toDataURL()

link.click()

}
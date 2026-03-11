let images = []

function showPage(id){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active")
})

document.getElementById(id).classList.add("active")

}

function applyTheme(){

let bg=document.getElementById("bgColor").value
let text=document.getElementById("textColor").value

document.body.style.backgroundColor=bg
document.body.style.color=text

}

function generateUsernames(){

let len=parseInt(document.getElementById("nameLength").value)
let count=parseInt(document.getElementById("nameCount").value)

let chars="abcdefghijklmnopqrstuvwxyz0123456789"

let output=""

for(let c=0;c<count;c++){

let name=""

for(let i=0;i<len;i++){
name+=chars[Math.floor(Math.random()*chars.length)]
}

output+=name+"<br>"

}

document.getElementById("nameOutput").innerHTML=output

}

document.addEventListener("DOMContentLoaded",()=>{

document.getElementById("upload").addEventListener("change",function(e){

let container=document.getElementById("imageContainer")
container.innerHTML=""
images=[]

Array.from(e.target.files).forEach(file=>{

let reader=new FileReader()

reader.onload=function(event){

let img=new Image()

img.onload=function(){

let canvas=document.createElement("canvas")
let ctx=canvas.getContext("2d")

canvas.width=img.width
canvas.height=img.height

ctx.drawImage(img,0,0)

container.appendChild(canvas)

images.push(canvas)

}

img.src=event.target.result

}

reader.readAsDataURL(file)

})

})

})

function hexToRgb(hex){

return{
r:parseInt(hex.substr(1,2),16),
g:parseInt(hex.substr(3,2),16),
b:parseInt(hex.substr(5,2),16)
}

}

function removeBackground(){

let color=hexToRgb(document.getElementById("removeColor").value)
let tol=document.getElementById("tolerance").value

images.forEach(canvas=>{

let ctx=canvas.getContext("2d")

let img=ctx.getImageData(0,0,canvas.width,canvas.height)
let data=img.data

for(let i=0;i<data.length;i+=4){

if(
Math.abs(data[i]-color.r)<tol &&
Math.abs(data[i+1]-color.g)<tol &&
Math.abs(data[i+2]-color.b)<tol
){
data[i+3]=0
}

}

ctx.putImageData(img,0,0)

})

}

function clearCanvas(){

document.getElementById("imageContainer").innerHTML=""
images=[]

}

function downloadAll(){

images.forEach((canvas,i)=>{

let link=document.createElement("a")

link.download="image_"+i+".png"
link.href=canvas.toDataURL()

link.click()

})

}
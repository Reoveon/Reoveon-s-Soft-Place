
function showSection(section){

document.querySelectorAll(".section").forEach(s=>{
s.classList.remove("active")
})

document.getElementById(section).classList.add("active")

}



let uploadedImages=[]

document.getElementById("imageUpload").addEventListener("change",function(e){

const container=document.getElementById("imageContainer")
container.innerHTML=""

uploadedImages=[]

for(let file of e.target.files){

let img=document.createElement("img")
img.src=URL.createObjectURL(file)

container.appendChild(img)

uploadedImages.push(img)

}

})



function removeBackground(){

const color=document.getElementById("removeColor").value

const r=parseInt(color.substr(1,2),16)
const g=parseInt(color.substr(3,2),16)
const b=parseInt(color.substr(5,2),16)

uploadedImages.forEach(img=>{

let canvas=document.createElement("canvas")
let ctx=canvas.getContext("2d")

canvas.width=img.width
canvas.height=img.height

ctx.drawImage(img,0,0)

let data=ctx.getImageData(0,0,canvas.width,canvas.height)

for(let i=0;i<data.data.length;i+=4){

let dr=data.data[i]
let dg=data.data[i+1]
let db=data.data[i+2]

let diff=Math.abs(dr-r)+Math.abs(dg-g)+Math.abs(db-b)

if(diff<100){
data.data[i+3]=0
}

}

ctx.putImageData(data,0,0)

img.src=canvas.toDataURL()

})

}



function generateUsernames(){

const length=parseInt(document.getElementById("charLength").value)
const amount=parseInt(document.getElementById("userAmount").value)

const chars="abcdefghijklmnopqrstuvwxyz"

let output=""

for(let i=0;i<amount;i++){

let name=""

for(let j=0;j<length;j++){
name+=chars[Math.floor(Math.random()*chars.length)]
}

output+=name+"<br>"

}

document.getElementById("usernameList").innerHTML=output

}



let loadedFont=null

document.getElementById("fontUpload").addEventListener("change",function(e){

const file=e.target.files[0]

const reader=new FileReader()

reader.onload=function(){

const font=new FontFace("customFont",reader.result)

font.load().then(function(loaded){

document.fonts.add(loaded)
loadedFont="customFont"

})

}

reader.readAsArrayBuffer(file)

})



function renderFont(){

const text=document.getElementById("fontText").value
const canvas=document.getElementById("fontCanvas")

const ctx=canvas.getContext("2d")

canvas.width=800
canvas.height=200

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.font="60px "+loadedFont
ctx.fillStyle="#000"

ctx.fillText(text,50,120)

}
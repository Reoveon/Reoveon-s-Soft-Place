function switchTab(tab){
document.querySelectorAll(".tab").forEach(t=>{
t.classList.remove("active")
})
document.getElementById(tab).classList.add("active")
}

/* dark mode */

function toggleDark(){
document.body.classList.toggle("dark")
}

/* music */

const music=document.getElementById("music")

function toggleMusic(){
if(music.paused){
music.play()
}else{
music.pause()
}
}

document.getElementById("volume").addEventListener("input",e=>{
music.volume=e.target.value
})

/* particles */

const canvas=document.getElementById("particles")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let particles=[]

for(let i=0;i<90;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*3,
speed:Math.random()*0.5
})
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height)
ctx.fillStyle="rgba(255,255,255,0.6)"

particles.forEach(p=>{
p.y-=p.speed

if(p.y<0){
p.y=canvas.height
p.x=Math.random()*canvas.width
}

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fill()
})

requestAnimationFrame(animate)
}

animate()

/* username generator */

function generateUsernames(){

const length=document.getElementById("charLength").value
const amount=document.getElementById("userAmount").value

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

/* ===========================
BACKGROUND REMOVER
=========================== */

function removeBackground(){

const files=document.getElementById("imageUpload").files
const container=document.getElementById("imageContainer")
const removeColor=document.getElementById("removeColor").value

container.innerHTML=""

if(files.length===0){
alert("Upload an image first")
return
}

const r=parseInt(removeColor.substr(1,2),16)
const g=parseInt(removeColor.substr(3,2),16)
const b=parseInt(removeColor.substr(5,2),16)

Array.from(files).forEach(file=>{

const img=new Image()
img.src=URL.createObjectURL(file)

img.onload=function(){

const canvas=document.createElement("canvas")
const ctx=canvas.getContext("2d")

canvas.width=img.width
canvas.height=img.height

ctx.drawImage(img,0,0)

const imageData=ctx.getImageData(0,0,canvas.width,canvas.height)
const data=imageData.data

for(let i=0;i<data.length;i+=4){

let dr=data[i]-r
let dg=data[i+1]-g
let db=data[i+2]-b

let distance=Math.sqrt(dr*dr+dg*dg+db*db)

if(distance<80){
data[i+3]=0
}

}

ctx.putImageData(imageData,0,0)

const download=document.createElement("a")
download.innerText="Download Image"
download.href=canvas.toDataURL("image/png")
download.download="removed.png"

container.appendChild(canvas)
container.appendChild(document.createElement("br"))
container.appendChild(download)
container.appendChild(document.createElement("hr"))

}

})

}

/* ===========================
FONT LOADER
=========================== */

let loadedFont=null

document.getElementById("fontUpload").addEventListener("change",async function(e){

const file=e.target.files[0]
if(!file) return

const font=new FontFace("customFont",file)

await font.load()

document.fonts.add(font)

loadedFont="customFont"

alert("Font Loaded!")

})

function renderFont(){

const text=document.getElementById("fontText").value
const canvas=document.getElementById("fontCanvas")
const ctx=canvas.getContext("2d")

canvas.width=800
canvas.height=200

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="#000"
ctx.textAlign="center"
ctx.textBaseline="middle"

if(loadedFont){
ctx.font="60px "+loadedFont
}else{
ctx.font="60px sans-serif"
}

ctx.fillText(text,canvas.width/2,canvas.height/2)

/* download button */

let link=document.createElement("a")
link.innerText="Download Text Image"
link.href=canvas.toDataURL("image/png")
link.download="font.png"

const parent=canvas.parentElement

if(!document.getElementById("fontDownload")){
link.id="fontDownload"
parent.appendChild(document.createElement("br"))
parent.appendChild(link)
}

}
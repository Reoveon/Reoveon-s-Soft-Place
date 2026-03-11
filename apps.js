/* DARK MODE */

function toggleDark(){
document.body.classList.toggle("dark")
}

/* MUSIC */

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

/* PARTICLES */

const bg=document.getElementById("bgParticles")
const ctx=bg.getContext("2d")

bg.width=window.innerWidth
bg.height=window.innerHeight

let particles=[]

for(let i=0;i<80;i++){
particles.push({
x:Math.random()*bg.width,
y:Math.random()*bg.height,
size:Math.random()*3,
speed:Math.random()*0.4
})
}

function animate(){

ctx.clearRect(0,0,bg.width,bg.height)

particles.forEach(p=>{

p.y-=p.speed

if(p.y<0){
p.y=bg.height
}

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fill()

})

requestAnimationFrame(animate)
}

animate()

/* DRAG DROP */

const dropZone=document.getElementById("dropZone")
const upload=document.getElementById("imageUpload")

dropZone.onclick=()=>upload.click()

dropZone.addEventListener("dragover",e=>{
e.preventDefault()
dropZone.classList.add("drag")
})

dropZone.addEventListener("dragleave",()=>{
dropZone.classList.remove("drag")
})

dropZone.addEventListener("drop",e=>{
e.preventDefault()
dropZone.classList.remove("drag")
upload.files=e.dataTransfer.files
})

/* BACKGROUND REMOVER */

function removeBackground(){

const files=upload.files
const container=document.getElementById("imageContainer")
const color=document.getElementById("removeColor").value

container.innerHTML=""

const r=parseInt(color.substr(1,2),16)
const g=parseInt(color.substr(3,2),16)
const b=parseInt(color.substr(5,2),16)

Array.from(files).forEach(file=>{

const img=new Image()
img.src=URL.createObjectURL(file)

img.onload=function(){

const canvas=document.createElement("canvas")
const ctx=canvas.getContext("2d")

canvas.width=img.width
canvas.height=img.height

ctx.drawImage(img,0,0)

let data=ctx.getImageData(0,0,canvas.width,canvas.height)
let pixels=data.data

for(let i=0;i<pixels.length;i+=4){

let dr=pixels[i]-r
let dg=pixels[i+1]-g
let db=pixels[i+2]-b

let dist=Math.sqrt(dr*dr+dg*dg+db*db)

if(dist<80){
pixels[i+3]=0
}

}

ctx.putImageData(data,0,0)

let link=document.createElement("a")
link.href=canvas.toDataURL("image/png")
link.download="removed.png"
link.innerText="Download Image"

container.appendChild(canvas)
container.appendChild(link)

}

})

}

/* FONT LOADER */

let loadedFont=null

document.getElementById("fontUpload").addEventListener("change",async e=>{

const file=e.target.files[0]
if(!file)return

const font=new FontFace("customFont",file)

await font.load()
document.fonts.add(font)

loadedFont="customFont"

})

function renderFont(){

const text=document.getElementById("fontText").value
const canvas=document.getElementById("fontCanvas")
const ctx=canvas.getContext("2d")

canvas.width=800
canvas.height=200

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.textAlign="center"
ctx.textBaseline="middle"
ctx.fillStyle="#000"

if(loadedFont){
ctx.font="60px "+loadedFont
}else{
ctx.font="60px sans-serif"
}

ctx.fillText(text,canvas.width/2,canvas.height/2)

let link=document.createElement("a")
link.href=canvas.toDataURL("image/png")
link.download="text.png"
link.innerText="Download Text"

canvas.parentElement.appendChild(link)

}
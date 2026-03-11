/* tabs */

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

/* volume */

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
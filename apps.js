// section switching

const buttons=document.querySelectorAll(".nav button[data-section]")

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{

const id=btn.dataset.section

document.querySelectorAll(".panel").forEach(panel=>{
panel.classList.remove("active")
})

document.getElementById(id).classList.add("active")

})

})


// username generator

function generateUsername(){

const words=["Shadow","Pixel","Nova","Ghost","Cyber","Vortex","Echo"]
const ends=["X","HD","77","Dev","TV","AI"]

let name=words[Math.floor(Math.random()*words.length)]
let end=ends[Math.floor(Math.random()*ends.length)]
let num=Math.floor(Math.random()*999)

document.getElementById("usernameOutput").innerText=name+end+num

}


// dev panel

document.getElementById("devBtn").onclick=()=>{

const panel=document.getElementById("devPanel")

panel.style.display=panel.style.display==="block"?"none":"block"

}


// themes

function setTheme(theme){

document.body.className=theme

}

function randomTheme(){

const themes=["dark","neon","galaxy"]

setTheme(themes[Math.floor(Math.random()*themes.length)])

}


// particles

function spawnParticles(){

for(let i=0;i<40;i++){

const p=document.createElement("div")

p.style.position="absolute"
p.style.width="3px"
p.style.height="3px"
p.style.background="white"
p.style.borderRadius="50%"

p.style.left=Math.random()*100+"vw"
p.style.top=Math.random()*100+"vh"

document.getElementById("particles").appendChild(p)

}

}

spawnParticles()
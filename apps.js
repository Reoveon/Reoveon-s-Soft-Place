let images=[]

document.addEventListener("DOMContentLoaded",()=>{

/* SECTION NAVIGATION */

document.querySelectorAll("nav button").forEach(btn=>{

btn.addEventListener("click",()=>{

let page=btn.dataset.page

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active")
})

document.getElementById(page).classList.add("active")

})

})

/* THEME */

document.getElementById("applyTheme").addEventListener("click",()=>{

let bg=document.getElementById("bgColor").value
let text=document.getElementById("textColor").value

document.body.style.backgroundColor=bg
document.body.style.color=text

})

/* USERNAME GENERATOR */

document.getElementById("generateNames").addEventListener("click",()=>{

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

})

/* IMAGE UPLOAD */

document.getElementById("upload").addEventListener("change",e=>{

let container=document.getElementById("imageContainer")
container.innerHTML=""
images=[]

Array.from(e.target.files).forEach(file=>{

let reader=new FileReader()

reader.onload=event=>{

let img=new Image()

img.onload=()=>{

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

/* REMOVE BACKGROUND */

document.getElementById("removeBG").addEventListener("click",()=>{

let hex=document.getElementById("removeColor").value
let tol=document.getElementById("tolerance").value

let r=parseInt(hex.substr(1,2),16)
let g=parseInt(hex.substr(3,2),16)
let b=parseInt(hex.substr(5,2),16)

images.forEach(canvas=>{

let ctx=canvas.getContext("2d")
let img=ctx.getImageData(0,0,canvas.width,canvas.height)
let data=img.data

for(let i=0;i<data.length;i+=4){

if(
Math.abs(data[i]-r)<tol &&
Math.abs(data[i+1]-g)<tol &&
Math.abs(data[i+2]-b)<tol
){
data[i+3]=0
}

}

ctx.putImageData(img,0,0)

})

})

/* CLEAR */

document.getElementById("clearImages").addEventListener("click",()=>{

document.getElementById("imageContainer").innerHTML=""
images=[]

})

/* DOWNLOAD */

document.getElementById("downloadImages").addEventListener("click",()=>{

images.forEach((canvas,i)=>{

let link=document.createElement("a")
link.download="image_"+i+".png"
link.href=canvas.toDataURL()
link.click()

})

})

})
let uploadedImage = null;

function showPage(id){

document.querySelectorAll(".page").forEach(page=>{
page.classList.remove("active")
});

document.getElementById(id).classList.add("active");

}

function applyTheme(){

let bg = document.getElementById("bgColor").value;
let text = document.getElementById("textColor").value;

document.body.style.backgroundColor = bg;
document.body.style.color = text;

}

function generateUsername(){

let len = document.getElementById("nameLength").value;

let chars = "abcdefghijklmnopqrstuvwxyz0123456789";

let name = "";

for(let i=0;i<len;i++){
name += chars[Math.floor(Math.random()*chars.length)];
}

document.getElementById("nameOutput").innerText = name;

}

document.addEventListener("DOMContentLoaded", function(){

document.getElementById("upload").addEventListener("change", function(e){

let reader = new FileReader();

reader.onload = function(event){

let img = new Image();

img.onload = function(){

uploadedImage = img;

let canvas = document.getElementById("original");
let ctx = canvas.getContext("2d");

canvas.width = img.width;
canvas.height = img.height;

ctx.drawImage(img,0,0);

};

img.src = event.target.result;

};

reader.readAsDataURL(e.target.files[0]);

});

});

function hexToRgb(hex){

return{
r:parseInt(hex.substr(1,2),16),
g:parseInt(hex.substr(3,2),16),
b:parseInt(hex.substr(5,2),16)
};

}

function removeBackground(){

if(!uploadedImage) return;

let color = hexToRgb(document.getElementById("removeColor").value);
let tol = document.getElementById("tolerance").value;

let canvas = document.getElementById("result");
let ctx = canvas.getContext("2d");

canvas.width = uploadedImage.width;
canvas.height = uploadedImage.height;

ctx.drawImage(uploadedImage,0,0);

let img = ctx.getImageData(0,0,canvas.width,canvas.height);
let data = img.data;

for(let i=0;i<data.length;i+=4){

if(
Math.abs(data[i]-color.r) < tol &&
Math.abs(data[i+1]-color.g) < tol &&
Math.abs(data[i+2]-color.b) < tol
){
data[i+3] = 0;
}

}

ctx.putImageData(img,0,0);

}

function clearCanvas(){

let o = document.getElementById("original");
let r = document.getElementById("result");

o.getContext("2d").clearRect(0,0,o.width,o.height);
r.getContext("2d").clearRect(0,0,r.width,r.height);

}

function downloadImage(){

let canvas = document.getElementById("result");

let link = document.createElement("a");
link.download = "reoveons-image.png";
link.href = canvas.toDataURL();

link.click();

}
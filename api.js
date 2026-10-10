const loadBtn=document.querySelector("#load-btn");
const status=document.querySelector("#status");
const list=document.querySelector("#notes-list");

const form=document.querySelector("#note-form");
const titleInput=document.querySelector("#title");
const bodyInput=document.querySelector("#body");
const submitBtn=document.querySelector("#submit-btn");


let notes=[];


function render(){

list.innerHTML="";


if(notes.length===0){

list.textContent="No notes available.";

return;

}


notes.forEach(note=>{


const li=document.createElement("li");


const title=document.createElement("h3");
title.textContent=note.title;


const body=document.createElement("p");
body.textContent=note.body;



const del=document.createElement("button");

del.textContent="Delete";


del.onclick=()=>deleteNote(note.id,li);



li.appendChild(title);
li.appendChild(body);
li.appendChild(del);


list.appendChild(li);


});


}





async function loadNotes(){

loadBtn.disabled=true;

status.textContent="Loading notes...";


try{


const response=await fetch(
"https://jsonplaceholder.typicode.com/posts?_limit=10"
);


if(!response.ok){
throw new Error();
}


notes=await response.json();


render();


status.textContent="Loaded 10 notes from the server.";



}

catch(error){

status.textContent="Could not load notes. Please try again.";

}

finally{

loadBtn.disabled=false;

}

}


loadBtn.addEventListener(
"click",
loadNotes
);





form.addEventListener(
"submit",
async(e)=>{


e.preventDefault();


const title=titleInput.value.trim();

const body=bodyInput.value.trim();


if(title==="" ){

status.textContent="Title is required.";

return;

}


if(title.length>100){

status.textContent="Title must be 100 characters or fewer.";

return;

}



submitBtn.disabled=true;


try{


const response=await fetch(
"https://jsonplaceholder.typicode.com/posts",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

title:title,

body:body,

userId:1

})

});



const newNote=await response.json();


notes.unshift(newNote);


render();


status.textContent=
`Note created (status ${response.status}, id ${newNote.id}).`;


titleInput.value="";
bodyInput.value="";



}

catch(error){

status.textContent="Could not create note.";

}


finally{

submitBtn.disabled=false;

}


});





async function deleteNote(id,element){


try{


const response=await fetch(

`https://jsonplaceholder.typicode.com/posts/${id}`,

{

method:"DELETE"

}

);



if(!response.ok){

throw new Error();

}



// JSONPlaceholder does not permanently save/delete data.
// We update our local array to simulate real app behaviour.

notes=notes.filter(
note=>note.id!==id
);


render();


status.textContent="Note deleted.";


}


catch(error){

status.textContent="Could not delete note.";

}


}
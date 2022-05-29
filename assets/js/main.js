var titleInput=document.getElementById("title");
var writerInput=document.getElementById("writer");
var tagsInput=document.getElementById("tag");
var descriptionInput=document.getElementById("description");
var createdDateInput=document.getElementById("calender");
var addbtn=document.getElementById("add");
var tableData=document.getElementById("data");
var inputs=document.getElementsByClassName("input");
var delBtn=document.getElementById("delBtn");
var editbtn=document.getElementById("editbtn");
var myAlert=document.getElementById("my-alert");
var current=0;
if(localStorage.getItem("tagsList"))
{
    var tags=JSON.parse(localStorage.getItem("tagsList"));
    display()
}
else{
    var tags=[];
    localStorage.setItem("tagsList",JSON.stringify(tags));
}

addbtn.addEventListener("click",function(){
    addTag();
    }
);

 function addTag()
 {
     var tag =
     {   id:tags.length,
         title:titleInput.value,
         writer:writerInput.value,
         tags:tagsInput.value,
         desc:descriptionInput.value,
         date:createdDateInput.value
     }
    // console.log(tag.title);
    //console.log(tag);
    tags.push(tag);
    localStorage.setItem("tagsList",JSON.stringify(tags));
    //console.log(tags)
    display();
    clear();
 }
 function display()
 {
     var resulte="";
     for(var i=0;i<tags.length;i++)
     {
         resulte+=
         `<tr>
         <td>${tags[i].id}</td>
         <td>${tags[i].title}</td>
         <td>${tags[i].writer}</td>
         <td>${tags[i].tags}</td>
         <td>${tags[i].desc}</td>
         <td>${tags[i].date}</td>
         <td><button class="btn btn-primary" onclick="getlog(${i})">Edit</button></td>
         <td><button class="btn btn-danger" onclick="deletTag(${i})">Delete</button></td>
         </tr>
         `
     }
     tableData.innerHTML=resulte;
 }
 function deletTag(index)
 {
    // console.log(index);
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    tags.splice(index,1);
    localStorage.setItem("tagsList",JSON.stringify(tags));
    display();
 }
 function clear()
 {
    for(var i=0;i<inputs.length;i++)
    {
        inputs[i].value="";
    }
 }
 delBtn.onclick=function delBtn()
 {
     //console.log("hello from del all function");
     Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    localStorage.removeItem("tagsList");
     tags=[];
    tableData.innerHTML="";
    
 }
 function getlog(index)
 {
     //console.log(index);
titleInput.value=tags[index].title;
writerInput.value=tags[index].writer;
tagsInput.value=tags[index].tags;
descriptionInput.value=tags[index].desc;
createdDateInput.value=tags[index].date;
editbtn.style.opacity=1;
current=index;
 }
 function updatelog()
 {
     tags[current].title=titleInput.value;
     tags[current].writer=writerInput.value;
     tags[current].tags=tagsInput.value;
     tags[current].desc=descriptionInput.value;
     tags[current].date=createdDateInput.value;
     console.log(tags);
     localStorage.setItem("tagsList", JSON.stringify(tags));
     display(); 
     clear();
     editbtn.style.opacity=0;
     Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
 }
 title.onkeyup=function()
 {
    var titlePatren=/^[A-Z][a-z]{2,8}$/;
    if(titlePatren.test(title.value))
    { 
        addbtn.removeAttribute("disabled");
        title.classList.add("is-valid");
        title.classList.remove("is-invalid");
        myAlert.classList.add("d-none");
        

    }
    else{
        addbtn.disabled="true";
        title.classList.add("is-invalid");
        title.classList.remove("is-valid");
        myAlert.classList.remove("d-none");
    }
}
writer.onkeyup=function()
{
    writerPatren=/^([A-Z]||[a-z]){3,10}$/;
    if(writerPatren.test(writer.value))
    {
           writer.classList.add("is-valid");
           writer.classList.remove("is-invalid");  
    }
    else{
        addbtn.disabled="true";
        writer.classList.add("is-invalid");
        writer.classList.remove("is-valid");
        
    }
}



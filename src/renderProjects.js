import todo from "./todos";

//RENDER LIST OF CURRENT PROJECT NAMES IN SIDEBAR(NAV)

export default function renderProjects(list){
    const projectsList=document.getElementById('projects');
    projectsList.innerHTML=''
    for(let i=0;i<list.length;i++){
        let li =document.createElement('li');
        let button=document.createElement('button');
        button.textContent=list[i].name;
        button.setAttribute("data-index",i)
    
        button.onclick=renderProjectPage
        li.appendChild(button)
        projectsList.appendChild(li)
    }

}



//render intial project page


export function renderIntialProjectPage(projects,index=0){
    let specificProject=projects[index]
    const projectTitle=document.querySelector('.projectTitle');
    const content=document.querySelector('.content');
    const main=document.querySelector("#main")
    
    content.innerHTML='';
    let addTaskButton=document.createElement("button");
    let taskDiv=document.createElement('div');
    taskDiv.classList.add('taskDiv');

    addTaskButton.textContent="Add Task"
    addTaskButton.classList.add("addTask")
    addTaskButton.setAttribute("Data-project-index",0)
    addTaskButton.onclick=openTaskDialog

    
    content.appendChild(addTaskButton);
    content.appendChild(taskDiv);

    
    projectTitle.textContent=specificProject.name
    specificProject.content.forEach((x,taskIndex)=>{
        let div=document.createElement("div");
        let title=document.createElement('h5');
        let priority=document.createElement("p");
        let dueDate=document.createElement("p");
        let checkbox=document.createElement('input');
        checkbox.setAttribute("type","checkbox")
        checkbox.setAttribute('data-project-index',index)
        checkbox.setAttribute('data-task-index',taskIndex)
        let deleteButton=document.createElement("button")
        let edit=document.createElement("button");
       
        title.textContent=x.title;
        dueDate.textContent=x.dueDate;
        deleteButton.textContent="Delete";
        deleteButton.setAttribute('data-task-index',taskIndex)
        deleteButton.setAttribute('data-project-index',index);
        deleteButton.onclick=deleteTask
        edit.textContent="Edit";
        edit.setAttribute('data-task-index',taskIndex)
        edit.setAttribute('data-project-index',index)
        edit.onclick=renderEditTaskForm
        priority.textContent=x.priority;
        priority.classList.add(x.priority);
       
        div.appendChild(title);
        div.appendChild(dueDate);
        div.appendChild(priority);
        div.appendChild(checkbox);
        div.appendChild(deleteButton);
        div.appendChild(edit);
        
        taskDiv.appendChild(div)
       
       
    })

}



//ALLOW USER TO SWITCH BETWEEN DIFFERENT PROJECT TABS


function renderProjectPage(e){
    let projects=localStorage.getItem("projects")==null?[{name:'general',content:[]}]:JSON.parse(localStorage.getItem('projects'));
    let index
    if(localStorage.getItem("projects")==null)index=0;
    index=Number(e.target.getAttribute("data-index"));
    let specificProject=projects[index]
    const projectTitle=document.querySelector('.projectTitle');
    const content=document.querySelector('.content');
   
    const main=document.querySelector("#main")
    let addTaskButton=document.createElement("button");
    let taskDiv=document.createElement('div');
    taskDiv.classList.add('taskDiv')


    content.innerHTML='';
    addTaskButton.classList.add("addTask")
    addTaskButton.textContent="Add Task";
    addTaskButton.setAttribute("Data-project-index",index);
    addTaskButton.onclick=openTaskDialog
    content.appendChild(addTaskButton);
    content.appendChild(taskDiv)
   

    projectTitle.textContent=specificProject.name
    specificProject.content.forEach((x,taskIndex)=>{

        //creating different elements
        let div=document.createElement("div");
        let title=document.createElement('h5');
        let priority=document.createElement("p");
        let dueDate=document.createElement("p");
        let checkbox=document.createElement('input');
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute('data-project-index',index)
        checkbox.setAttribute('data-task-index',taskIndex)
        let deleteButton=document.createElement("button")
        let edit=document.createElement("button");
        
        

        //adding text ,classes and attributes
       
        title.textContent=x.title;
        dueDate.textContent=x.dueDate;
        deleteButton.textContent="Delete";
        deleteButton.setAttribute('data-task-index',taskIndex)
        deleteButton.setAttribute('data-project-index',index)
        deleteButton.onclick=deleteTask
        edit.textContent="Edit"
        edit.setAttribute('data-task-index',taskIndex)
        edit.setAttribute('data-project-index',index);
        edit.onclick=renderEditTaskForm
        priority.textContent=x.priority;
        priority.classList.add(x.priority);


        //appending content 
        
        div.appendChild(title);
        div.appendChild(dueDate);
        div.appendChild(priority);
        div.appendChild(checkbox);
        div.appendChild(deleteButton);
        div.appendChild(edit);
       
        taskDiv.append(div)

       
    })



}



//add Task to projects


function openTaskDialog(e){
    //e.preventDefault()
    let index=e.target.getAttribute('data-project-index')
    let closeModal=()=>{dialog.close()
    dialog.innerHTML=""
    main.removeChild(dialog)
    }


    let main=document.getElementById('main')

    let dialog=document.createElement('dialog');
    dialog.classList.add('taskForm')
    let form=document.createElement('form')
    let title=document.createElement("input");
    let description=document.createElement("input");
    let dueDate=document.createElement("input");
    let priority=document.createElement("select");
    let high=document.createElement('option');
    let medium=document.createElement('option');
    let low=document.createElement('option');
    let submit=document.createElement("button");
    let label=document.createElement('label');
    let labelDescrpit=document.createElement('label');
    let labelDue=document.createElement('label');
    let labelPriority=document.createElement('label');
    let close=document.createElement("button");
    
    title.setAttribute("type","text");
    title.setAttribute("id","title");
    description.setAttribute("type","text");
    description.setAttribute("id","descript");
    dueDate.setAttribute("type","date")
    dueDate.setAttribute("id","duedate")
    priority.setAttribute("id","priority")
    high.setAttribute("value","high")
    medium.setAttribute("value","medium")
    low.setAttribute("value","low")
    submit.setAttribute("type","submit");
    submit.setAttribute('data-index',index)
    label.setAttribute('for',"title")
    labelDescrpit.setAttribute("for","description");
    labelDue.setAttribute("for","duedate");
    labelPriority.setAttribute("for","priority")
     
    label.textContent="Title";
    labelDescrpit.textContent="description";
    labelDue.textContent="Due Date";
    labelPriority.textContent="Priority";
    high.textContent="high"
    medium.textContent="medium"
    low.textContent="low"
    submit.textContent="submit";
    close.textContent="Close" 
    close.onclick=closeModal;
    submit.onclick=addTask
    
    priority.appendChild(high);
    priority.appendChild(medium);
    priority.appendChild(low)
    form.appendChild(label);
    form.appendChild(title);
    form.appendChild(labelDescrpit);
    form.appendChild(description);
    form.appendChild(labelDue);
    form.appendChild(dueDate);
    form.appendChild(labelPriority);
    form.appendChild(priority);
    form.appendChild(submit);
    dialog.appendChild(form);
    dialog.appendChild(close)
    
    main.appendChild(dialog)
    dialog.showModal()

}




//Remove task from todo

function addTask(e){
    e.preventDefault()
    let dialog=document.querySelector('.taskForm')
    let closeModal=()=>{dialog.close()
        dialog.innerHTML=""
        main.removeChild(dialog)
        }
    let projects=localStorage.getItem("projects")==null?[{name:'general',content:[]}]:JSON.parse(localStorage.getItem('projects'));
    let index=Number(e.target.getAttribute("data-index"))
    let title=e.target.parentElement[0].value
    let description=e.target.parentElement[1].value
    let dueDate=e.target.parentElement[2].value
    let priority=e.target.parentElement[3].value
    let task=todo(title,description,dueDate,priority);
    projects[index].content.push(task)
    localStorage.setItem("projects",JSON.stringify(projects))
    closeModal()
    renderIntialProjectPage(projects,index)
    console.log(title)

}




//DELETE TASK


function deleteTask(e){
    let projects=localStorage.getItem("projects")==null?[{name:'general',content:[]}]:JSON.parse(localStorage.getItem('projects'));
    let projectIndex=Number(e.target.getAttribute("data-project-index"));
    let taskIndex=Number(e.target.getAttribute("data-task-index"))
    projects[projectIndex].content.splice(taskIndex,1)
   
    localStorage.setItem("projects",JSON.stringify(projects))
    renderIntialProjectPage(projects,projectIndex)
}




//Edit Task


function renderEditTaskForm(e){
    let projects=localStorage.getItem("projects")==null?[{name:'general',content:[]}]:JSON.parse(localStorage.getItem('projects'))
    let projectIndex=Number(e.target.getAttribute("data-project-index"));
    let taskIndex=Number(e.target.getAttribute("data-task-index"))



    let closeModal=()=>{dialog.close()
        dialog.innerHTML=""
        main.removeChild(dialog)
        }
    
    
        let main=document.getElementById('main')
    
        let dialog=document.createElement('dialog');
        dialog.classList.add('taskForm')
        let form=document.createElement('form')
        let title=document.createElement("input");
        let description=document.createElement("input");
        let dueDate=document.createElement("input");
        let priority=document.createElement("select");
        let high=document.createElement('option');
        let medium=document.createElement('option');
        let low=document.createElement('option');
        let submit=document.createElement("button");
        let label=document.createElement('label');
        let labelDescrpit=document.createElement('label');
        let labelDue=document.createElement('label');
        let labelPriority=document.createElement('label');
        let close=document.createElement("button");
        
        title.setAttribute("type","text");
        title.setAttribute("id","title");
        description.setAttribute("type","text");
        description.setAttribute("id","descript");
        dueDate.setAttribute("type","date")
        dueDate.setAttribute("id","duedate")
        priority.setAttribute("id","priority")
        high.setAttribute("value","high")
        medium.setAttribute("value","medium")
        low.setAttribute("value","low")
        submit.setAttribute("type","submit");
        submit.setAttribute('data-project-index',projectIndex);
        submit.setAttribute("data-task-index",taskIndex)
        label.setAttribute('for',"title")
        labelDescrpit.setAttribute("for","description");
        labelDue.setAttribute("for","duedate");
        labelPriority.setAttribute("for","priority")
         
        label.textContent="Title";
        labelDescrpit.textContent="description";
        labelDue.textContent="Due Date";
        labelPriority.textContent="Priority";
        high.textContent="high"
        medium.textContent="medium"
        low.textContent="low"
        submit.textContent="submit";
        close.textContent="Close" 
        close.onclick=closeModal;
        submit.onclick=editTask



//ESTABLISHING CURRENT VALUES BEFORE EDIT
let currentTitle=projects[projectIndex].content[taskIndex].title;
title.value=currentTitle;
let currentDescription=projects[projectIndex].content[taskIndex].description;
description.value=currentDescription
let currentdueDate=projects[projectIndex].content[taskIndex].dueDate;
dueDate.value=currentdueDate
let currentPriority=projects[projectIndex].content[taskIndex].priority;
priority.value=currentPriority


        
        priority.appendChild(high);
        priority.appendChild(medium);
        priority.appendChild(low)
        form.appendChild(label);
        form.appendChild(title);
        form.appendChild(labelDescrpit);
        form.appendChild(description);
        form.appendChild(labelDue);
        form.appendChild(dueDate);
        form.appendChild(labelPriority);
        form.appendChild(priority);
        form.appendChild(submit);
        dialog.appendChild(form);
        dialog.appendChild(close)
        
        main.appendChild(dialog)
        dialog.showModal()
    

}

//COMMIT CHANGES

function editTask(e){
    e.preventDefault()
   
    let projectIndex=e.target.getAttribute("data-project-index");
    let taskIndex=e.target.getAttribute("data-task-index");
    let dialog=document.querySelector('.taskForm')
    let closeModal=()=>{dialog.close()
        dialog.innerHTML=""
        main.removeChild(dialog)
        }
    let projects=localStorage.getItem("projects")==null?[{name:'general',content:[]}]:JSON.parse(localStorage.getItem('projects'))
     let title=e.target.parentElement[0].value
    let description=e.target.parentElement[1].value
    let dueDate=e.target.parentElement[2].value
    let priority=e.target.parentElement[3].value
    let task=todo(title,description,dueDate,priority);
    projects[projectIndex].content[taskIndex]=task;


    localStorage.setItem("projects",JSON.stringify(projects))
    closeModal()
    renderIntialProjectPage(projects,projectIndex)
    //console.log(title)

}
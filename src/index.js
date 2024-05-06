import './style.css'
import projectMaker from './projectmaker.js'
import {todo ,MakeSureTaskIsDone} from './todos.js'
import { addToContent } from './projectmaker'
import renderProjects from './renderProjects.js'
import { renderIntialProjectPage } from './renderProjects.js'

//INTIALIZING PAGE

function intializePage(){
    let intializeProjects=localStorage.getItem("projects")==null?[{name:'general',content:[]}]:JSON.parse(localStorage.getItem('projects'))
    
    return intializeProjects;
}
const projects=intializePage();




//ADD PROJECT TO PROJECT LIST

 function addProject(e){
  e.preventDefault()
  let dialog=document.querySelector('.projectForm')
  let name=e.target.parentElement[0].value
  let alreadyThere=projects.some(x=>{return x.name==name})
  if(name && !alreadyThere ){
      let project=projectMaker(name)
      projects.push(project)
      localStorage.setItem("projects",JSON.stringify(projects))
      renderProjects(JSON.parse(localStorage.getItem("projects")))
      dialog.close(

      )
  }

}





//render project form 

function renderProjectForm (project){
    let closeModal=()=>{dialog.close()}


    let main=document.getElementById('main')

    let dialog=document.createElement('dialog');
    dialog.classList.add('projectForm')
    let form=document.createElement('form')
    let name=document.createElement("input");
    let submit=document.createElement("button");
    let label=document.createElement('label');
    let close=document.createElement("button");
    
    name.setAttribute("type","text");
    name.setAttribute("id","name");
    submit.setAttribute("type","submit");
    label.setAttribute('for',"name")
    label.textContent="Name";
    submit.textContent="submit";
    close.textContent="Close" 
    close.onclick=closeModal;
    submit.onclick=addProject
    
    
    form.appendChild(label);
    form.appendChild(name);
    form.appendChild(submit);
    dialog.appendChild(form);
    dialog.appendChild(close)
    
    main.appendChild(dialog)
    dialog.showModal()
}
const addProjButton=document.getElementById('add-project');
addProjButton.onclick=renderProjectForm









//render projects 
renderProjects(projects);
renderIntialProjectPage(projects)


export default function todo(title,description,dueDate,priority,done=false){
    


    return {title,description,dueDate,priority,done}

}


export function MakeSureTaskIsDone(todo){

    if(!todo.done){todo.done=true}


}



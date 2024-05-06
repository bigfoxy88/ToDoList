export default function projectMaker(name,content=[]){

    

    return {name, content}

}

export function addToContent(list,item){
    list.push(item)
}

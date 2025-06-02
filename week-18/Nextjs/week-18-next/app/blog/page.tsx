import axios from "axios"

async function getBlogs() {
    const request = await axios.get("https://jsonplaceholder.typicode.com/todos")
    return request.data
}


export default async function blog() {
    const blog = await getBlogs()
    return (
        <div>
            This is a Blog Post
            {blog.map((item:ITodo,index:number )=><Todo key={index} completed={item.completed} title={item.title}/>)}
        </div>
    )
}

interface ITodo {
    title: string
    completed: string
}

function Todo({ title, completed }: ITodo) {
    return (
        <div>
            {title} {completed ? "is completed" : "not completed"}
        </div>
    )
}
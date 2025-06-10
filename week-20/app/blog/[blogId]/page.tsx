import axios from "axios";
export default async function dynamicRoutes({params}:any) {
    const blogId= (await params).blogId
    const gettingData= await axios.get(`https://jsonplaceholder.typicode.com/posts/${blogId}`)
    const data= await gettingData.data
    return(
        <div>
            {data.title}
        </div>
    )
    
}
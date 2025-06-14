import axios from "axios";
// Code review
export default async function blog({params}:any) {
    
    const postId= (await params).blogId
    return(
        <div>
            {JSON.stringify(postId)}
        </div>
    )
}
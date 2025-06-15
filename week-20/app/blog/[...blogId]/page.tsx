import axios from "axios";

export default async function blog({params}:any) {
    
    const postId= (await params).blogId
    return(
        <div>
            {JSON.stringify(postId)}
        </div>
    )
}
// Completed week 20
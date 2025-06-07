import axios from "axios"

export default async function BlogPost({ params }: any) {
    const postId = (await params).blogId;
    const request = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const response = await request.data
    return (
        <div>

            Blog page {postId} 
            <br />
            Blog Title {response.title}
            <br />
            Blog Boyd {response.body}
        </div>
    )
}
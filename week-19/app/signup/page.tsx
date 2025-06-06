"use client"
export default function signup() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="border p-2"></div>
            <input type="text" name="" placeholder="username" id="" />
            <input type="password" name="" placeholder="password" id="" />
            <button onClick={() => {
                console.log("Signin")
            }}>Signup</button>

        </div>
    )
}
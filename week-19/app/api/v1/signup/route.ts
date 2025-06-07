import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
const client = new PrismaClient()
export async function POST(req: NextRequest) {
    console.log("reached request")

    const userData = await req.json();
    console.log(userData)
    try {

        await client.user.create({
            data: {
                email: userData.username,
                password: userData.password
            }
        })
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({
        message: "You are signed in "
    })

}
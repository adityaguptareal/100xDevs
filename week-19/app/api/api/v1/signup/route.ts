import { NextResponse } from "next/server";

export function POST(req: NextResponse) {
    return NextResponse.json({
        "message": "You have signed up on the app"
    })
}
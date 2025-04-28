import getRedis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const { email } = await request.json()
    const redis = await getRedis();
    await redis.set(`email:${email}`, Date.now())

    return NextResponse.json({ message: "Email added to list" })
}

export async function GET(request: NextRequest) {
    if (process.env.NODE_ENV !== "development") {
        return NextResponse.json({ message: "Not allowed" }, { status: 403 })
    }

    const redis = await getRedis();
    const emails = await redis.keys("email:*")
    return NextResponse.json({ emails })
}

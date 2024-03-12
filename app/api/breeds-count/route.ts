import breeds from "@/breeds-count.json"
import { NextResponse } from "next/server"

export async function GET() {
    return NextResponse.json({
            breeds
        })
}
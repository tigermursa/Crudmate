
// app/api/create-user/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const userData = await req.json();

    try {
        const response = await fetch('https://crudemate-server.vercel.app/api/v1/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to create user' }, { status: response.status });
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.log("error from api/create", error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

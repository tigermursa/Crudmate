// app/api/update-user/[userId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;
    const userData = await req.json(); // Get the data from the request body

    try {
        const response = await fetch(`http://localhost:5000/api/v1/update-user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to update user' }, { status: response.status });
        }

        const result = await response.json();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

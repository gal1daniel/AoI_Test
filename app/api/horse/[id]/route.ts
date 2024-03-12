import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';
import horses from "@/horses.json"

interface Horse {
    id: string;
    name: string;
    color: string;
    dateofbirth: string;
    breed: string;
    stable: string;
}

export async function PUT(request: Request) {
    try {
        const requestData: Horse = JSON.parse(await request.text());

        if (!requestData.id || !requestData.name || !requestData.color || !requestData.dateofbirth || !requestData.breed || !requestData.stable) {
            throw new Error('Incomplete horse data');
        }

        const filePath = path.join(process.cwd(), 'horses.json');
        let existingData: Horse[] = [];
        try {
            const horsesString = await fs.readFile(filePath, 'utf-8');
            if (horsesString.trim() !== '') {
                existingData = JSON.parse(horsesString);
            }
        } catch (error: any) { 
            console.error('Error reading file:', error);
            return NextResponse.json({
                success: false,
                message: 'Failed to read horses data',
            });
        }

        const indexToUpdate = existingData.findIndex(horse => horse.id === requestData.id);
        if (indexToUpdate === -1) {
            return NextResponse.json({
                success: false,
                message: 'Horse not found',
            });
        }

        existingData[indexToUpdate] = requestData;

        await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

        return NextResponse.json({
            success: true,
            message: 'Horse updated successfully',
            horse: requestData
        });
    } catch (error) {
        console.error('Error updating horse:', error);
        return NextResponse.json({
            success: false,
            message: (error as Error).message || 'Failed to update horse',
        });
    }
}

export async function GET() {
    return NextResponse.json({
            horses
        })
}

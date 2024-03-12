import { NextResponse } from "next/server";
import fs from 'fs/promises';


export async function POST(request: Request) {
    try {
        const horses = await request.json();

        const filePath = 'horses.json';

        let existingData = [];
        try {
            const horsesString = await fs.readFile(filePath, 'utf-8');
            existingData = JSON.parse(horsesString);
        } catch (error) {
            console.error('Error reading file:', error);
        }

        existingData.push(horses);

        await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

        return NextResponse.json({
            success: true,
            message: 'Horse added successfully',
            horses: existingData
        });
    } catch (error) {
        console.error('Error adding horse:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to add horse',
        });
    }
}
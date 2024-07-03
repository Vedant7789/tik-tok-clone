// app/api/uploads/route.ts
import { s3, s3Bucket } from "@/libs/S3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { file, fileName } = await req.json();

    const uploadParams = {
        Bucket: s3Bucket,
        Key: fileName,
        Body: Buffer.from(file, "base64"), // Assumes file is base64 encoded
        ContentType: "video/mp4", // Adjust as needed
    };

    try {
        const uploadResult = await s3.upload(uploadParams).promise();
        return NextResponse.json({ fileUrl: uploadResult.Location });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

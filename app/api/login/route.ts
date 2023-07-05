import bcrypt from "bcryptjs";
import { getUserByEmailOrPhoneNumber } from '@/lib/prisma/user';
import { NextRequest, NextResponse } from 'next/server';
import { exclude } from '@/lib/prisma/ultis';
import { setUserCookie } from "@/lib/auth";
import { jsonResponse } from "@/lib/auth/utils";

export async function POST(req: NextRequest) {
    console.log('req.credentials', req.credentials)
    const { username, password } = await req.json();
    const user = await getUserByEmailOrPhoneNumber(username);
    if (!user) {
        return NextResponse.json({ message: "user not found!" }, { status: 401 });
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
        return NextResponse.json({ message: "user password is incorrect!" }, { status: 401 });
    }

    // const {password: userPassword, ...userWithoutPassword} = user;
    const userWithoutPassword = exclude(user, ['password']);
    try {
        return await setUserCookie(jsonResponse(200, { success: true }), userWithoutPassword);
    } catch (err) {
        console.error(err);
        return jsonResponse(500, { error: { message: 'Authentication failed.' } });
    }
}
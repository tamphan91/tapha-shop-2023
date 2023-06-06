import bcrypt from "bcryptjs";
import { getUserByEmailOrPhoneNumber } from '@/lib/prisma/user';
import { NextRequest, NextResponse } from 'next/server';
import { exclude } from '@/lib/prisma/ultis';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const {username, password} = await req.json();
    const user = await getUserByEmailOrPhoneNumber(username);
    if(!user) {
        return NextResponse.json({message: "user not found!"}, {status: 401});
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if(!isValid) {
        return NextResponse.json({message: "user password is incorrect!"}, {status: 401});
    }

    const userWithoutPassword = exclude(user, ['password']);
    const token = signToken(userWithoutPassword);

    return NextResponse.json({message: "login success!", token});
}
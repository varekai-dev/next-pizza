import { NextResponse } from 'next/server'
import { prisma } from '../../../prisma/prisma-client'

export async function GET() {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
}

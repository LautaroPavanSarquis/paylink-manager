import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { createLinkLimiter } from '@/lib/ratelimit'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('paylink')
    const links = await db
      .collection('links')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(links, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los links' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success, remaining } = await createLinkLimiter.limit(ip)

  if (!success) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Esperá un momento e intentá de nuevo.' },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
    const { name, amount, description } = body

    if (!name || amount === undefined || amount === null || amount === '') {
      return NextResponse.json(
        { error: 'Nombre y monto son requeridos' },
        { status: 400 }
      )
    }

    const numericAmount = Number(amount)

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { error: 'El monto debe ser un número mayor a cero' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('paylink')

    const newLink = {
      name,
      amount: numericAmount,
      description: description || '',
      status: 'pending',
      createdAt: new Date(),
      id: crypto.randomUUID(),
    }

    await db.collection('links').insertOne(newLink)

    return NextResponse.json(newLink, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear el link' },
      { status: 500 }
    )
  }
}
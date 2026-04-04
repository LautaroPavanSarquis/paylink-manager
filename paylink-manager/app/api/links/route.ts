import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

// GET - trae todos los links
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('paylink')
    const links = await db
      .collection('links')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(links)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los links' },
      { status: 500 }
    )
  }
}

// POST - crea un nuevo link
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, amount, description } = body

    // Validación básica
    if (!name || !amount) {
      return NextResponse.json(
        { error: 'Nombre y monto son requeridos' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('paylink')

    const newLink = {
      name,
      amount: Number(amount),
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
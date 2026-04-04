import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('paylink')

    const link = await db
      .collection('links')
      .findOne({ id: params.id })

    if (!link) {
      return NextResponse.json(
        { error: 'Link no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(link)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener el link' },
      { status: 500 }
    )
  }
}

// PATCH - actualiza el status a 'paid'
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('paylink')

    await db.collection('links').updateOne(
      { id: params.id },
      { $set: { status: 'paid', paidAt: new Date() } }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar el link' },
      { status: 500 }
    )
  }
}
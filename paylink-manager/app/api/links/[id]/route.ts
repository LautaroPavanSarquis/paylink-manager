import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { paymentLimiter } from '@/lib/ratelimit'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const client = await clientPromise
    const db = client.db('paylink')

    const link = await db.collection('links').findOne({ id })

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await paymentLimiter.limit(ip)

  if (!success) {
    return NextResponse.json(
      { error: 'Demasiados intentos de pago. Esperá un momento e intentá de nuevo.' },
      { status: 429 }
    )
  }

  try {
    const { id } = await params
    const client = await clientPromise
    const db = client.db('paylink')

    await db.collection('links').updateOne(
      { id },
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
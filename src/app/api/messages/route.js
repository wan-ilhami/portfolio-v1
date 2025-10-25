// app/api/messages/route.js
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const message = await prisma.message.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
        picture: body.picture || null,
        provider: body.provider
      }
    })
    
    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Failed to create message:', error)
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
  }
}

// app/api/messages/[id]/route.js
export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid message ID' }, { status: 400 })
    }

    await prisma.message.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete message:', error)
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}
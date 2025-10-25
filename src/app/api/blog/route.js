// ============================================
// src/app/api/blog/route.js (GET all posts)
// ============================================
import { NextResponse } from 'next/server';
import { getAllPosts } from '../../lib/mdx';

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading posts:', error);
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 });
  }
}
// ============================================
// src/app/api/blog/[slug]/route.js (GET single post)
// ============================================
import { NextResponse } from 'next/server';
import { getPostBySlug } from '../../../lib/mdx';

export async function GET(req, { params }) {
  try {
    const post = getPostBySlug(params.slug);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error reading post:', error);
    return NextResponse.json({ error: 'Failed to load post' }, { status: 500 });
  }
}
// ============================================
// src/app/lib/mdx.js
// ============================================
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "src/app/(pages)/blog/content");

export function getAllPosts() {
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.warn(`Content directory not found: ${contentDirectory}`);
      return [];
    }

    const files = fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".mdx"));

    const posts = files.map((file) => {
      const filePath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      // Return with NESTED frontmatter structure
      return {
        slug: file.replace(/\.mdx$/, ""),
        frontmatter: { 
          title: data.title || "Untitled",
          date: data.date || null,
          author: data.author,
          summary: data.summary || data.description || "Description missing",
          tags: data.tags || [],
          draft: data.draft || false,
          readingTime: readingTime(content),
        },
      };
    });

    return posts
      .filter(post => !post.frontmatter.draft)
      .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
  } catch (err) {
    console.error("Error reading posts:", err);
    return [];
  }
}

export function getPostBySlug(slug) {
  try {
    const realSlug = slug.replace(/\.mdx?$/, "");
    const filePath = path.join(contentDirectory, `${realSlug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`Post not found: ${filePath}`);
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const allPosts = getAllPosts();
    const currentIndex = allPosts.findIndex(post => post.slug === realSlug);
    
    return {
      slug: realSlug,
      content,
      frontmatter: {  // ✅ Also nested here
        ...data,
        readingTime: readingTime(content),
      },
      prev: currentIndex > 0 ? {
        slug: allPosts[currentIndex - 1].slug,
        title: allPosts[currentIndex - 1].frontmatter.title
      } : null,
      next: currentIndex < allPosts.length - 1 ? {
        slug: allPosts[currentIndex + 1].slug,
        title: allPosts[currentIndex + 1].frontmatter.title
      } : null,
    };
  } catch (err) {
    console.error(`Error loading post ${slug}:`, err);
    return null;
  }
}
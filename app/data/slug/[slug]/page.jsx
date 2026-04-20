// app/data/slug/[slug]/page.jsx
// Next.js App Router — dynamic blog detail page

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import blogs from "@/app/data/blogs";

// Generate static params so Next.js pre-renders every blog page
export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.id }));
}

// Generate dynamic metadata per page
export async function generateMetadata({ params }) {
  const blog = blogs.find((b) => b.id === params.slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: { images: [blog.image] },
  };
}

export default function BlogDetailPage({ params }) {
  const blog = blogs.find((b) => b.id === params.slug);
  if (!blog) notFound();

  // Related posts: rest of the blogs, newest first
  const related = blogs
    .filter((b) => b.id !== blog.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  return (
    <main className="min-h-screen text-white">
      {/* Hero */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6 md:left-12 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-200 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </Link>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12">
          <span className="inline-block text-xs font-semibold bg-purple-600 text-white px-3 py-1 rounded-full mb-3">
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            {blog.title}
          </h1>
          <div className="flex items-center gap-3 mt-4 text-sm text-white/50">
            <span>{blog.author}</span>
            <span>·</span>
            <span>
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>·</span>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 md:px-0 py-12">
        <div
          className="prose prose-invert prose-lg prose-p:text-white/70 prose-headings:text-white prose-a:text-purple-400 max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 md:px-0 pb-20 border-t border-white/10 pt-12">
          <h2 className="text-xl font-bold text-white mb-6">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/data/slug/${r.id}`}
                className="group flex gap-4 p-4 rounded-xl border border-white/10 hover:border-purple-500/40 bg-white/5 hover:bg-white/8 transition-all duration-200"
              >
                <div className="relative flex-none w-20 h-20 rounded-lg overflow-hidden">
                  <Image src={r.image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="80px" />
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">{r.readTime}</p>
                  <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
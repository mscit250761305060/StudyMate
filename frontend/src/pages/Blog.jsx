import React from "react";
import Breadcrumb from "../components/Breadcrumb";

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Mastering the BSc IT Syllabus: Top 5 Study Strategies",
      excerpt: "The BSc IT syllabus can feel overwhelming, but with these five proven study strategies, you can optimize your time and achieve better grades.",
      date: "August 15, 2026",
      author: "Admin",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      category: "Study Tips"
    },
    {
      id: 2,
      title: "Why AI is Changing How We Study Programming",
      excerpt: "From generating boilerplate code to explaining complex algorithms, see how AI assistants are becoming the ultimate study companion for IT students.",
      date: "July 28, 2026",
      author: "Tech Team",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      category: "Technology"
    },
    {
      id: 3,
      title: "Preparing for Your Lab Practicals: A Complete Guide",
      excerpt: "Don't leave your lab preparation to the last minute. This comprehensive guide covers everything from writing code on paper to debugging under pressure.",
      date: "June 10, 2026",
      author: "Admin",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
      category: "Exams"
    }
  ];

  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: "Blog" }]} />
      
      <div className="page-header" style={{ marginBottom: "40px" }}>
        <h2>StudySphere Blog</h2>
        <p>Insights, tips, and updates for BSc IT students.</p>
      </div>

      <div className="blog-grid">
        {blogPosts.map(post => (
          <article key={post.id} className="blog-card">
            <div className="blog-card-image" style={{ backgroundImage: `url(${post.imageUrl})` }}>
              <span className="blog-category">{post.category}</span>
            </div>
            <div className="blog-card-content">
              <div className="blog-meta">
                <span>{post.date}</span>
                <span className="blog-meta-separator">•</span>
                <span>By {post.author}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <button className="blog-read-more">Read More →</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;

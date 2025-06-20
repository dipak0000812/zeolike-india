import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  // Placeholder blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'The Hottest Real Estate Trends in 2024',
      date: 'June 15, 2024',
      author: 'Zeolike Team',
      excerpt: 'Discover the key trends shaping the Indian real estate market this year, from sustainable living to smart homes.',
      imageUrl: 'https://images.unsplash.com/photo-1516153723377-50798e983446?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      title: 'Tips for First-Time Homebuyers in India',
      date: 'June 10, 2024',
      author: 'Zeolike Experts',
      excerpt: 'Navigating the homebuying process can be daunting. Here are essential tips for first-time buyers in India.',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ff51f81648a1?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      title: 'Understanding Property Taxes in Maharashtra',
      date: 'June 5, 2024',
      author: 'Legal Team',
      excerpt: 'A comprehensive guide to property taxes in Maharashtra, helping you understand your obligations.',
      imageUrl: 'https://images.unsplash.com/photo-1559846663-149c04944d1e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Zeolike Blog & News</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest real estate news, market trends, and expert insights from Zeolike.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  By {post.author} on {post.date}
                </p>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="text-blue-600 hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Future Pagination or Categories (Placeholder) */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">More articles and categories coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Blog; 
'use client';

import { useState } from 'react';
import ArticleCard from '@/components/blog/ArticleCard';
import SearchBar from '@/components/blog/SearchBar';
import CategoryPills from '@/components/blog/CategoryPills';

const TAG_KEY_TO_ENGLISH = {
  engineering: 'Engineering',
  ideas: 'Ideas',
  openSource: 'Open Source',
  startup: 'Startup',
  design: 'Design',
  research: 'Research',
  rodgmont: 'Rodgmont',
};

export default function BlogClient({ posts, locale, messages, viewCounts = {}, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [activeTag, setActiveTag] = useState('all');

  const filtered = posts.filter((a) => {
    const matchesQuery =
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle?.toLowerCase().includes(query.toLowerCase());
    const matchesTag =
      activeTag === 'all' ||
      a.tags?.some((t) => t.toLowerCase() === (TAG_KEY_TO_ENGLISH[activeTag] ?? activeTag).toLowerCase());
    return matchesQuery && matchesTag;
  });

  return (
    <section style={{ paddingBottom: '80px' }}>
      <div className="container" style={{ paddingTop: '20px' }}>
        <h1 style={{ marginBottom: '8px' }}>{messages.blog.title}</h1>
        <p className="text-muted" style={{ marginBottom: '28px', fontSize: '0.95rem' }}>
          {messages.blog.subtitle}
        </p>

        <SearchBar placeholder={messages.blog.searchPlaceholder} onSearch={setQuery} />
        <CategoryPills locale={locale} active={activeTag} onChange={setActiveTag} messages={messages} />

        {filtered.length === 0 ? (
          <p className="text-muted" style={{ textAlign: 'center', paddingTop: '60px' }}>
            {messages.blog.empty}
          </p>
        ) : (
          filtered.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              locale={locale}
              viewCount={(viewCounts[article.slug] ?? article.views) ?? 0}
            />
          ))
        )}
      </div>
    </section>
  );
}


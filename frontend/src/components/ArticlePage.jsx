import React from 'react';
import './ArticlePage.css'; // Import the CSS file

const articles = [
  {
    title: "The Best Skincare Routines for Every Skin Type",
    url: "https://www.allure.com/gallery/best-skincare-routines",
  },
  {
    title: "Top Makeup Trends for 2024",
    url: "https://www.vogue.com/article/top-makeup-trends",
  },
  {
    title: "How to Find Your Perfect Foundation Shade",
    url: "https://www.marieclaire.com/beauty/foundation-shade-guide",
  },
  {
    title: "Benefits of Regular Facials",
    url: "https://www.harpersbazaar.com/beauty/skincare-benefits",
  },
  {
    title: "DIY Beauty Hacks: Affordable Tips for Perfect Skin",
    url: "https://www.byrdie.com/diy-beauty-hacks",
  },
  {
    title: "The Ultimate Guide to Choosing Skincare Products for Your Skin Type",
    url: "https://www.self.com/skincare-guide",
  },
  {
    title: "The Science Behind Anti-Aging Skincare Products",
    url: "https://www.healthline.com/anti-aging-skincare",
  },
  {
    title: "Understanding Different Types of Makeup Brushes",
    url: "https://www.cosmopolitan.com/beauty/makeup-brush-guide",
  },
];

const ArticlePage = () => {
  return (
    <div className="article-page">
      <h1 className="article-heading">Beauty Articles</h1>
      <ul className="article-list">
        {articles.map((article, index) => (
          <li key={index} className="article-item">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlePage;

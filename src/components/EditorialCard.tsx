import React from 'react';

interface EditorialCardProps {
  category?: string;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  imageUrl: string;
  layout?: 'featured' | 'small' | 'compact' | 'half';
}

const EditorialCard: React.FC<EditorialCardProps> = ({
  category,
  title,
  subtitle,
  author,
  date,
  imageUrl,
  layout = 'small'
}) => {
  return (
    <div className={`editorial-card ${layout}`}>
      <div className="card-image-wrapper">
        <img src={imageUrl} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        {category && <span className="card-category">{category}</span>}
        <h2 className={`card-title serif ${layout === 'featured' ? 'large' : ''}`}>{title}</h2>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {(author || date) && (
          <div className="card-meta">
            {author && <span className="card-author">{author}</span>}
            {date && <span className="card-date">{date}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorialCard;

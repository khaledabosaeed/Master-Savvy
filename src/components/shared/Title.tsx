import React from 'react';

interface TitleProps {
  label?: string;
  title?: string;
  titleStart?: string;
  titleHighlight?: string;
  titleEnd?: string;
  description?: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({
  label,
  title,
  titleStart,
  titleHighlight,
  titleEnd,
  description,
  className = ''
}) => {
  return (
    <div className={`text-center ${className}`}>
      {label && (
        <div className="inline-block mb-4">
          <span className="text-xs md:text-sm font-semibold text-secondary tracking-wider uppercase bg-[#F8F8F8] px-4 md:px-6 py-2 rounded-full">
            {label}
          </span>
        </div>
      )}
      <h2 className="text-2xl md:text-5xl font-bold text-secondary mb-4 md:mb-6">
        {title ? (
          title
        ) : (
          <>
            {titleStart} <span className="text-primary">{titleHighlight}</span> {titleEnd}
          </>
        )}
      </h2>
      {description && (
        <p className="text-sm md:text-lg text-secondary/70 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default Title;

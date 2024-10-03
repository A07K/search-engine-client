import React from "react";

// Video Result Component
export const VideoResult = ({ result }) => (
  <div className="mb-4 p-4 bg-gray-100 rounded shadow">
    {" "}
    {/* Applied background color */}
    <h2 className="text-xl font-bold">{result.title}</h2>
    <div className="flex items-center mt-2">
      <img
        src={result.thumbnail}
        alt={result.title}
        className="w-32 h-24 object-cover mr-4"
      />
      <div>
        <p className="text-gray-600">{result.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Views: {result.views} | Likes: {result.likes}
        </p>
      </div>
    </div>
    <a
      href={result.link}
      className="text-blue-500 hover:underline mt-2 inline-block"
      target="_blank"
      rel="noopener noreferrer"
    >
      Watch on YouTube
    </a>
  </div>
);

// Article Result Component
export const ArticleResult = ({ result }) => (
  <div className="mb-4 p-4 bg-gray-100 rounded shadow">
    {" "}
    {/* Applied background color */}
    <h2 className="text-xl font-bold">{result.title}</h2>
    <p className="text-gray-600 mt-2">{result.snippet}</p>
    <a
      href={result.link}
      className="text-blue-500 hover:underline mt-2 inline-block"
      target="_blank"
      rel="noopener noreferrer"
    >
      Read Article
    </a>
  </div>
);

// Blog Result Component
export const BlogResult = ({ result }) => (
  <div className="mb-4 p-4 bg-gray-100 rounded shadow">
    {" "}
    {/* Applied background color */}
    <h2 className="text-xl font-bold">{result.title}</h2>
    <p className="text-gray-600 mt-2">{result.snippet}</p>
    <a
      href={result.link}
      className="text-blue-500 hover:underline mt-2 inline-block"
      target="_blank"
      rel="noopener noreferrer"
    >
      Read Blog Post
    </a>
  </div>
);

// Academic Paper Result Component
export const AcademicPaperResult = ({ result }) => {
  // Extract details from the result object
  const { title, link, publication_info, citations } = result;
  const { authors, summary } = publication_info || {};

  return (
    <div className="academic-result py-4 px-6 mb-4 bg-gray-100 rounded shadow">
      {" "}
      {/* Kept consistent styling */}
      {/* Title with Link */}
      <h3 className="text-lg font-semibold mb-2">
        <a href={link} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h3>
      {/* Summary or Snippet */}
      <p className="text-gray-700 mt-2 mb-4">{summary}</p>
      {/* Authors Section */}
      {authors && (
        <div className="mb-2">
          <p className="text-sm text-gray-500">Authors:</p>
          <ul className="list-disc pl-5 text-gray-600">
            {authors.map((author, index) => (
              <li key={index}>
                {author.link ? (
                  <a
                    href={author.link}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {author.name}
                  </a>
                ) : (
                  author.name
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Citations */}
      <p className="text-sm text-gray-500 mt-1">
        Citations: {citations ? citations : "No citation information available"}
      </p>
    </div>
  );
};

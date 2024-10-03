import React from "react";
import {
  VideoResult,
  ArticleResult,
  BlogResult,
  AcademicPaperResult,
} from "./ResultComponents";

export const ResultList = ({ results, activeFilter }) => {
  const filterResults = (results, filter) => {
    if (filter === "All") return results; // Show all results if 'All' is selected

    // Handle the filter based on the result type
    return results.filter((result) => {
      switch (filter.toLowerCase()) {
        case "videos":
          return result.type === "video";
        case "articles":
          return result.type === "article";
        case "blogs":
          return result.type === "blog";
        case "academic":
          return result.type === "academic"; // Added case for academic
        default:
          return false;
      }
    });
  };

  const renderedResults = filterResults(results, activeFilter);

  // Log renderedResults to inspect each result's properties
  console.log("Rendered Results:", renderedResults);

  return (
    <div className="mt-4">
      {renderedResults.length === 0 ? (
        <p className="text-gray-500">
          No results found. Try a different search term or filter.
        </p>
      ) : (
        renderedResults.map((result) => {
          switch (result.type) {
            case "video":
              return <VideoResult key={result.link} result={result} />;
            case "article":
              return <ArticleResult key={result.link} result={result} />;
            case "blog":
              return <BlogResult key={result.link} result={result} />;
            case "academic":
              return <AcademicPaperResult key={result.link} result={result} />;
            default:
              return null;
          }
        })
      )}
    </div>
  );
};

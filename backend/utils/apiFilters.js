class APIFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

search() {
  const keywords = this.queryString.keyword
    ? {
        name: {
          $regex: this.queryString.keyword, // Regular expression for keyword search & the use of regex does not require the keyword to be an exact match
          // This allows for partial matches, so "phone" would match "smartphone", "phone case", etc.         
          $options: "i", // Case-insensitive search  &  // The 'i' option makes the search case-insensitive
        },
      }
    : {};

  this.query = this.query.find({ ...keywords });  // Apply the search criteria to the query
  return this;                                    // Return the instance for method chaining
  }

filters() {
  const queryCopy = { ...this.queryString };

  // Fields to remove from query
  const fieldsToRemove = ["keyword", "page", "limit"];
  fieldsToRemove.forEach((el) => delete queryCopy[el]);

  // Convert operators (gt, gte, lt, lte) into MongoDB format
  let queryStr = JSON.stringify(queryCopy);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
  
  this.query = this.query.find(JSON.parse(queryStr));
  return this;
}

  pagination(resPerPage = 10) {
    const currentPage = Number(this.queryStr.page) || 1; // Get the current page from the query string or default to 1
    // Stub implementation for pagination to avoid syntax errors
    const skip = resPerPage * (currentPage - 1); // Calculate the number of documents to skip based on the current page and results per page
    this.query = this.query.limit(resPerPage).skip(skip); // Apply pagination to the query
    return this;
  }
}

export default APIFilters;
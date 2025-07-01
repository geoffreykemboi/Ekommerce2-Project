// utils/apiFilters.js
class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Remove fields from query that are not direct database fields
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((el) => delete queryCopy[el]);

    console.log("Filter query before processing:", queryCopy); // Debug log

    // Advanced filter for price, ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    const parsedQuery = JSON.parse(queryStr);
    console.log("Parsed query for database:", parsedQuery); // Debug log

    this.query = this.query.find(parsedQuery);

    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}
export default APIFilters;

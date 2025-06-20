// backend/utils/apiFilters.js

class APIFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filters() {
    const queryCopy = { ...this.queryString };

    const fieldsToRemove = ["keyword", "page"];
    fieldsToRemove.forEach((el) => delete queryCopy[el]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
    
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    // FIX IS HERE: Changed this.queryStr to this.queryString
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilters;
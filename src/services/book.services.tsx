import apiroot from "../app/api/api";

export const BookService = {
  mostviewed: async () => {
    try {
      const response = await apiroot.get("/search/mostview");
      const data = response.data.most_read.splice(0, 15) || response.data;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  },
  mostcomment: async () => {
    try {
      const response = await apiroot.get("/search/mostcomment");
      const data = response.data.splice(0, 15) || response.data;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  },
  books: async () => {
    try {
      const response = await apiroot.get("/books");
      const data = response.data.data;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

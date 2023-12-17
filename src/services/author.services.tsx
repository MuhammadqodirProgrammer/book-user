import apiroot from "../app/api/api";

export const AuthorService = {
  get: async () => {
    try {
      const response = await apiroot.get("/author");
      const data = response.data.data.splice(0, 5) || response.data.data;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

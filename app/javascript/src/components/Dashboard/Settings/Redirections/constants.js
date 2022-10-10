export const REDIRECTIONS_LIST = [
  {
    from: "localhost:3000/",
    to: "localhost:3000/dashboard",
    isEdit: true,
  },
  {
    from: "localhost:3000/index",
    to: "localhost:3000/articles",
    isEdit: false,
  },
  {
    from: "localhost:3000/create",
    to: "localhost:3000/article/create",
    isEdit: false,
  },
];

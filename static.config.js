import path from "path";

export default {
 getRoutes: async () => {
   return [
     {
       path: "/",
       template: "src/pages/activities",
     },
     {
       path: "/create-activity",
       template: "src/pages/createActivity",
     },
   ];
 },
 plugins: [
   [
     require.resolve("react-static-plugin-source-filesystem"),
     {
       location: path.resolve("./src/pages"),
     },
   ],
   require.resolve("react-static-plugin-reach-router"),
   require.resolve("react-static-plugin-sitemap"),
 ],
};
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // Add Last-Modified header for SEO
  const lastModified = new Date().toUTCString();
  response.headers.set('Last-Modified', lastModified);
  
  return response;
});

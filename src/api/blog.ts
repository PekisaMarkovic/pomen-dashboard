const base = 'blogs'

const getBlogById = (id: number) => `${base}/${id}`
const patchBlog = (id: number) => `${base}/${id}`
const deleteBlog = (id: number) => `${base}/${id}`
const deleteBlogContent = (id: number) => `${base}/blog-content/${id}`
const deleteBlogText = (id: number) => `${base}/blog-text/${id}`
const getBlogBySlug = (slug: string) => `${base}/slug/${slug}`
const getBlog = () => `${base}`
const createBlog = () => `${base}`
const blogSitemap = () => `${base}/sitemap`
const publishOrUnpublishBlog = () => `${base}/publish-blog`
const blogSearch = () => `${base}/search`

const BlogApis = {
  getBlog,
  getBlogById,
  deleteBlog,
  patchBlog,
  getBlogBySlug,
  createBlog,
  deleteBlogContent,
  publishOrUnpublishBlog,
  deleteBlogText,
  blogSitemap,
  blogSearch,
}

export default BlogApis

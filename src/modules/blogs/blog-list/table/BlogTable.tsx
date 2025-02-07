import PagginationWithoutUrl from '@/src/components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '@/src/components/table/DefaultTableSpace'
import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { generateArrayOfLen } from '@/src/utils/array'
import BlogTableHeader from '@/src/modules/blogs/blog-list/table/BlogTableHeader'
import BlogTableRow from '@/src/modules/blogs/blog-list/table/BlogTableRow'
import { selectBlogs } from '@/src/state/shared/blogs'

const BlogTable = () => {
  const { blogs } = useAppSelector(selectBlogs)

  const leftSpaces = 10 - (blogs?.items.length || 0)
  const defaultSpaces = generateArrayOfLen(leftSpaces)

  return (
    <div>
      <BlogTableHeader />

      {blogs?.items.map((c) => <BlogTableRow key={c.blogId} blog={c} />)}

      {defaultSpaces.map((e) => (
        <DefaultTableSpace key={e} isLast={e === defaultSpaces.length - 1} />
      ))}

      <div className="flex flex-row-reverse py-3.5 px-4">
        <PagginationWithoutUrl totalPages={blogs?.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default BlogTable

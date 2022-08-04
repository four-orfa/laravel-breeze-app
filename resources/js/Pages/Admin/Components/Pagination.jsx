import { Link } from '@inertiajs/inertia-react'

const Pagination = (props) => {
  const currentPage = props.property.owners.current_page
  const lastPage = props.property.owners.last_page

  let pages = []
  if (lastPage > 4) {
    if (currentPage - 2 < lastPage - 2) {
      pages = [
        { page: currentPage - 2 },
        { page: currentPage - 1 },
        { page: currentPage },
        { page: currentPage + 1 },
        { page: currentPage + 2 },
      ]
    } else {
      pages = [
        { page: lastPage - 4 },
        { page: lastPage - 3 },
        { page: lastPage - 2 },
        { page: lastPage - 1 },
        { page: lastPage },
      ]
    }
  } else {
    for (let i = 0; i < lastPage; i++) {
      const num = i + 1
      const obj = { page: num }
      pages.push(obj)
    }
  }

  return (
    <div className="flex bg-white rounded-lg font-[Poppins]">
      <Link
        href="./?page=1"
        className="h-12 border-2 border-r-0 border-indigo-600 text-center leading-10
              px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white"
      >
        First
      </Link>
      {pages.map((page, index) => (
        <Link
          key={index}
          href={`./?page=${page.page}`}
          className={`h-12 border-2 border-r-0 border-indigo-600 text-center leading-10
              w-12 ${currentPage === page.page && 'bg-indigo-600 text-white'}`}
        >
          {page.page}
        </Link>
      ))}
      <Link
        href={`./?page=${lastPage}`}
        className="h-12 border-2 border-indigo-600 text-center leading-10
              px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white"
      >
        Last
      </Link>
    </div>
  )
}

export default Pagination

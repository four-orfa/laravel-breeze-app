import React from 'react'
import AuthenticatedAdmin from './Components/AuthenticatedAdmin'
import { Head } from '@inertiajs/inertia-react'

export default function CreateOwner(props) {
  const dateFormat = (date) => {
    const dateTime = new Date(date)
    const formattedDate =
      dateTime.getFullYear() +
      ' / ' +
      (dateTime.getMonth() + 1) +
      ' / ' +
      dateTime.getDate()
    return formattedDate
  }
  const redirectToCreate = () => {
    window.location.href = route('admin.owners.create')
  }

  const redirectToEdit = (id) => {
    window.location.href = route('admin.owners.edit', id)
  }

  return (
    <AuthenticatedAdmin
      auth={props.auth}
      errors={props.errors}
      logoutPath="logout"
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Management
        </h2>
      }
    >
      <Head title="Management" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-6 mx-auto">
                  <div className="flex flex-col text-center w-full mb-">
                    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-8 text-gray-900">
                      OWNERS
                    </h1>
                  </div>
                  <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                    <button
                      className="flex mr-auto text-white bg-green-500 border-0 py-2 px-6 mb-10 focus:outline-none hover:bg-green-600 rounded"
                      onClick={redirectToCreate}
                    >
                      Register
                    </button>
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                            ID
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Name
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            e-mail
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            created_at
                          </th>
                          <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                        </tr>
                      </thead>

                      <tbody>
                        {props.owners.map((owner) => (
                          <tr key={owner.id}>
                            <td className="px-4 py-3">{owner.id}</td>
                            <td className="px-4 py-3">{owner.name}</td>
                            <td className="px-4 py-3">{owner.email}</td>
                            <td className="px-4 py-3">
                              {dateFormat(owner.created_at)}
                            </td>
                            <td className="px-4 py-3 text-lg text-gray-900">
                              <button
                                className="flex mr-auto text-white bg-lime-500 border-0 py-1 px-4 focus:outline-none hover:bg-lime-600 rounded"
                                onClick={() => redirectToEdit(owner.id)}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                    <a className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0">
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedAdmin>
  )
}

import React from 'react'
import AuthenticatedAdmin from './Components/AuthenticatedAdmin'
import { Head, Link } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

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

  const forceDeleteEvent = (id) => {
    if (confirm('Are you sure force delete?')) {
      Inertia.delete(route('admin.expired-owners.destroy', id))
    }
  }

  return (
    <AuthenticatedAdmin
      auth={props.auth}
      errors={props.errors}
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
                      EXPIRED OWNERS
                    </h1>
                  </div>
                  <div className="w-full mx-auto overflow-auto">
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
                          <th className="w-10 px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
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
                                className="inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150"
                                onClick={() => forceDeleteEvent(owner.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex pl-4 mt-10 lg:w-2/3 w-full mx-auto">
                    <Link
                      className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0"
                      href={route('admin.owners.index')}
                    >
                      back
                    </Link>
                  </div>
                  <div className="flex pl-4 mt-10 lg:w-2/3 w-full mx-auto">
                    <div>
                      <a
                        className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0"
                        onClick={() =>
                          (window.location.href = route('admin.owners.index'))
                        }
                      >
                        bad sample
                      </a>
                    </div>
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

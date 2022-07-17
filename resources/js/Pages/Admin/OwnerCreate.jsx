import React from 'react'
import AuthenticatedAdmin from './Components/AuthenticatedAdmin'
import { Head } from '@inertiajs/inertia-react'

export default function Dashboard(props) {
  const dateFormat = (date) => {
    const dateTime = new Date(date)
    const formattedDate =
      dateTime.getFullYear() +
      ' / ' +
      dateTime.getMonth() +
      ' / ' +
      dateTime.getDay()
    return formattedDate
  }

  return (
    <AuthenticatedAdmin
      auth={props.auth}
      errors={props.errors}
      logoutPath="logout"
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Create" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-4 mx-auto">
                  <div class="flex flex-col text-center w-full mb-12">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                      Create Owner
                    </h1>
                  </div>
                  <div class="lg:w-1/2 md:w-2/3 mx-auto">
                    <div class="-m-2">
                      <div class="p-2 w-2/3 mx-auto">
                        <div class="relative">
                          <label
                            for="name"
                            class="leading-7 text-sm text-gray-600"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div class="p-2 w-2/3 mx-auto">
                        <div class="relative">
                          <label
                            for="email"
                            class="leading-7 text-sm text-gray-600"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div class="p-2 w-2/3 mx-auto">
                        <div class="relative">
                          <label
                            for="password"
                            class="leading-7 text-sm text-gray-600"
                          >
                            password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div class="p-2 w-2/3 mx-auto">
                        <div class="relative">
                          <label
                            for="confirm"
                            class="leading-7 text-sm text-gray-600"
                          >
                            confirm
                          </label>
                          <input
                            type="confirm"
                            id="confirm"
                            name="confirm"
                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                      <div class="p-2 w-full mt-6 flex justify-around">
                        <button
                          class="flex mx-auto text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg"
                          type="button"
                          onClick={() => history.back()}
                        >
                          Back
                        </button>
                        <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                          Submit
                        </button>
                      </div>
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

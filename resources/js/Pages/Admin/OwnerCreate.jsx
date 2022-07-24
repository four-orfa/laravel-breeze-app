import React, { useEffect } from 'react'
import AuthenticatedAdmin from './Components/AuthenticatedAdmin'
import { Head, useForm } from '@inertiajs/inertia-react'
import Input from '@/Components/Input'
import ValidationErrors from '@/Components/ValidationErrors'

export default function Dashboard(props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const onHandleChange = (e) => {
    setData(
      e.target.name,
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    )
  }

  const submit = (e) => {
    e.preventDefault()
    post(route('admin.owners.store'))
  }

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation')
    }
  }, [])

  return (
    <AuthenticatedAdmin
      auth={props.auth}
      errors={props.errors}
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
              <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-4 mx-auto">
                  <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                      Create Owner
                    </h1>
                  </div>
                  <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="w-2/3 mx-auto">
                      <ValidationErrors errors={errors} />
                    </div>
                    <form onSubmit={submit}>
                      <div className="-m-2">
                        <div className="p-2 w-2/3 mx-auto">
                          <div className="relative">
                            <label
                              htmlFor="name"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Name
                            </label>
                            <Input
                              type="text"
                              id="name"
                              value={data.name}
                              name="name"
                              isFocused={true}
                              autoComplete="name"
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              handleChange={onHandleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="p-2 w-2/3 mx-auto">
                          <div className="relative">
                            <label
                              htmlFor="email"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Email
                            </label>
                            <Input
                              type="email"
                              id="email"
                              value={data.email}
                              name="email"
                              isFocused={true}
                              autoComplete="username"
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              handleChange={onHandleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="p-2 w-2/3 mx-auto">
                          <div className="relative">
                            <label
                              htmlFor="password"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Password
                            </label>
                            <Input
                              type="password"
                              id="password"
                              name="password"
                              value={data.password}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              handleChange={onHandleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="p-2 w-2/3 mx-auto">
                          <div className="relative">
                            <label
                              htmlFor="confirm"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Confirm Password
                            </label>
                            <Input
                              type="password"
                              id="password_confirmation"
                              name="password_confirmation"
                              value={data.password_confirmation}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              handleChange={onHandleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="p-2 w-full mt-6 flex justify-around">
                          <button
                            className="flex mx-auto text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg"
                            type="button"
                            onClick={() => history.back()}
                          >
                            Back
                          </button>
                          <button
                            className={`flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg ${
                              processing && 'opacity-25'
                            } `}
                            disabled={processing}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
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

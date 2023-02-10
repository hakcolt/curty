import { Validation } from "@hakcolt/validator"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import Router from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import FormButton from "../../components/form/Button"
import InputForm from "../../components/form/InputForm"
import SelectForm from "../../components/form/SelectForm"
import { useAuth } from "../../src/providers/auth"

export default function UserForm() {
  const [responseError, setResponseError] = useState("")
  const { createUser } = useAuth()

  const { register,
    handleSubmit,
    formState: { isSubmitting } } = useForm()

  const validateData = async (data) => {
    const isEmailValid = Validation.EMAIL_REGEX.test(data.email)
    const isPasswordValid = Validation.PASSWORD_REGEX.test(data.password)

    if (!isEmailValid) setResponseError("Invalid Email")
    else if (!isPasswordValid) setResponseError("The password must contain least at one upper case and one lower case letter, one digit and a length of least at 6 characters")
    else if (data.password != data.rePassword) setResponseError("The passwords don't match")
    else await regiserUser(data)
  }

  async function regiserUser(data) {
    data.gender = (data.gender as string).toLowerCase().replace(" ", "")
    setResponseError("")

    try {
      await createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        password: data.password
      })

      Router.push("/login")
    } catch (e: unknown) {
      setResponseError((e as Error).message)
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form data-testid="form-register" onSubmit={ handleSubmit(validateData as any) }>
      <div className="overflow-hidden shadow rounded-md">
        <div className="bg-neutral-800 px-6 py-7 sm:p-6">
          <div className="grid grid-cols-6 gap-6">

            <div className="col-span-6 sm:col-span-3">
              <InputForm
                register={ register("firstName", { required: true }) }
                label="First Name"
                type="text"
                name="firstName"
                id="first-name"
                className="block w-full rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <InputForm
                register={ register("lastName", { required: true }) }
                label="Last Name"
                type="text"
                name="lastName"
                id="last-name"
                className="block w-full rounded-md"
              />
            </div>

            <div className="col-span-6 grid grid-cols-2 md:gap-6">
              <div className="sm:col-span-1 col-span-2">
                <InputForm
                  register={ register("email", { required: true }) }
                  label="Email Address"
                  type="text"
                  name="email"
                  id="email"
                  className="block w-full rounded-md"
                />
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-neutral-100">Photo</label>
              <div className="mt-1 flex items-center">
                <UserCircleIcon className="text-neutral-200 h-14 w-14"></UserCircleIcon>
                <button
                  type="button"
                  className="ml-4 rounded-md border border-neutral-600 bg-neutral-700 py-2 px-3 text-sm font-medium leading-4 text-neutral-200 shadow-sm hover:bg-neutral-600 focus:ring-1 focus:border-red-600 focus:ring-red-600"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <SelectForm
                register={ register("gender", { required: true }) }
                id="gender"
                type="gender"
                label="Gender"
                name="gender"
                className="w-full"
              >
                <option>Male</option>
                <option>Female</option>
                <option>No binary</option>
              </SelectForm>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <InputForm
                register={ register("password", { required: true }) }
                label="Password"
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <InputForm
                register={ register("rePassword", { required: true }) }
                label="Enter Password Again"
                type="password"
                name="rePassword"
                id="re-password"
                className="block w-full rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="bg-neutral-700 px-4 py-3 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center">
            <p className="self-start sm:self-center text-neutral-200 text-sm">{ responseError }</p>
            <FormButton
              icon
              className={ "shrink-0" }
              isLoading={ isSubmitting }
            >Create Account</FormButton>
          </div>
        </div>
      </div>
    </form>
  )
}
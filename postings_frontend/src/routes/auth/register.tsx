import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { api, apiPublic } from '#/lib/axios'
import { useState } from 'react'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  // checks if the account is new or not
  const checkAccountStatus = useMutation({
    mutationFn: async function () {
      const { data } = await api.post<{ isUserNew: boolean }>("/user/account_setup/status")
      return data;
    },
    onSuccess(data) {
      if (data.isUserNew) {
        navigate({ to: "/onboarding" })
      }
    }
  })
  const login = useMutation({
    mutationFn: async function () {
      const { data } = await apiPublic.post<{ accessToken?: string }>("/auth/login", { email: email, password: password });
      return data;
    },
    async onSuccess(data) {
      const token: string = data.accessToken!
      localStorage.setItem("token", token)
      // console.log(login.data)
      await checkAccountStatus.mutateAsync()
    },

  })
  const sendData = useMutation({
    mutationFn: function () {
      return apiPublic.post<{ message: string }>("/auth/register", { email: email, password: password });
    },
    onSuccess() {
      setTimeout(() => {
        login.mutate()
      }, 2000)

    },
    onError(error) {
      // @ts-ignore
      // console.log(error.response.data.message)
      setToastMessage(error.response.data.message)


    }
  })
  const handleSubmit = function (e: any) {
    e.preventDefault()
    setToastMessage(null) // hide message 
    sendData.mutate()
  }
  const navigate = useNavigate({ from: "/auth/register" })
  // for debugging
  return <div className='lg:px-40 md:30 px-10 py-10 md:gap-20 gap-5  font-[ibm-sans] flex flex-col-reverse md:flex-row items-center justify-around min-h-screen bg-(--default-bg)'>
    <form className='bg-white rounded-lg border-b-3 border-b-(--main-accent) p-7 max-h-fit md:p-10 grow flex flex-col gap-5'>
      <h3 className='font-semibold text-lg'>Register</h3>
      {/*input fields*/}
      <div className='flex flex-col gap-5 text-sm'>
        <div className='mt-5 flex flex-col gap-2'>
          <label>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} id='email' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='example@email.com' />
        </div>
        <div className='mt-5 flex flex-col gap-2'>
          <label>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} id='password' autoComplete='false' type='password' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='super secret password' />
        </div>
      </div>
      {/* Other links */}
      <div className='flex flex-col gap-2 mb-5 text-xs'>
        <p>Are you an employer? Login here instead <Link to='/auth/employers/login' className='text-(--secondary-colour) font-bold hover:text-(--secondary-colour)/70 transition-colors'>here.</Link>  </p>
        <p>Already have an account? Login <Link to='/auth/candidates/login' className='text-(--secondary-colour) font-bold hover:text-(--secondary-colour)/70 transition-colors'>here.</Link> </p>
      </div>
      <p className='text-red-800 text-sm'>{toastMessage ?? ""}</p>

      {/* submit button */}
      <button onClick={(e) => handleSubmit(e)} className={sendData.isPending ? 'self-end bg-(--secondary-colour)/80 text-white/90 py-2 px-8 rounded-sm font-bold text-sm' : 'hover:bg-(--secondary-colour)/70 hover:cursor-pointer transition-colors self-end bg-(--secondary-colour) text-white py-2 px-8 rounded-sm font-bold text-sm'}>Submit</button>

    </form>
    <div className='text-center flex md:flex-col md:gap-15 gap-2 grow items-center'>
      <h1 className='md:text-2xl lg:text-3xl text-xl font-[headland-one]'>Postings.net</h1>
      <h5 className='lg:text-2xl md:text-xl text-lg'>Welcome</h5>
    </div>


  </div>
}

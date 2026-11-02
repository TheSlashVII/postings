import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { apiPublic } from '#/lib/axios'
import { useState } from 'react'

export const Route = createFileRoute('/auth/candidates/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useMutation({
    mutationFn: async function () {
      const { data } = await apiPublic.post<{ accessToken?: string }>("/auth/login", { email: email, password: password });
      return data;
    },
    onSuccess(data) {
      const token: string = data.accessToken!
      localStorage.setItem("token", token)
      console.log(login.data)
    },

  })
  const sendData = useMutation({
    mutationFn: async function () {
      const data = await apiPublic.post("/auth/register", { email: email, password: password });
      return data;
    },
    onSuccess() {
      setTimeout(() => {
        login.mutate()
      }, 2000)
      console.log("done")

    },
  })
  const handleSumbit = function (e: any) {
    e.preventDefault()
    sendData.mutate()
  }
  // for debugging
  return <div className='lg:px-40 md:30 px-10 py-10 md:gap-20 gap-5  font-[ibm-sans] flex flex-col-reverse md:flex-row items-center justify-around min-h-screen bg-(--default-bg)'>
    <form className='bg-white rounded-lg border-b-3 border-b-(--main-accent) p-7 max-h-fit md:p-10 grow flex flex-col gap-5'>
      <h3 className='font-semibold text-lg'>Register - Candidates</h3>
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

      {/* submit button */}
      <button onClick={(e) => handleSumbit(e)} className='self-end bg-(--secondary-colour) text-white py-2 px-8 rounded-sm font-bold text-sm'>Submit</button>

    </form>
    <div className='text-center flex md:flex-col md:gap-15 gap-2 grow items-center'>
      <h1 className='md:text-2xl lg:text-3xl text-xl font-[headland-one]'>Postings.net</h1>
      <h5 className='lg:text-2xl md:text-xl text-lg'>Welcome</h5>
    </div>


  </div>
}

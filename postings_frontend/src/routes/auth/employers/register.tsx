import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/employers/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='lg:px-40 md:30 px-10 py-10 md:gap-20 gap-5  font-[ibm-sans] flex flex-col-reverse md:flex-row items-center justify-around min-h-screen bg-(--default-bg)'>
    <form className='bg-white rounded-lg border-b-3 border-b-(--main-accent) p-7 max-h-fit md:p-10 grow flex flex-col gap-5'>
      <h3 className='font-semibold text-lg'>Login - Employers</h3>
      {/*input fields*/}
      <div className='flex flex-col gap-5 text-sm'>
        <div className='mt-5 flex flex-col gap-2'>
          <label>Email</label>
          <input id='email' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='example@email.com' />
        </div>
        <div className='mt-5 flex flex-col gap-2'>
          <label>Password</label>
          <input id='password' autoComplete='false' type='password' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='super secret password' />
        </div>
      </div>
      {/* Other links */}
      <div className='flex flex-col gap-2 mb-5 text-xs'>
        <p>Are you a candidate? Login here instead <Link to='/auth/candidates/login' className='text-(--secondary-colour) font-bold hover:text-(--secondary-colour)/70 transition-colors'>here.</Link>  </p>
        <p>Don’t have an account yet? Get one <Link to='/auth/employers/register' className='text-(--secondary-colour) font-bold hover:text-(--secondary-colour)/70 transition-colors'>here.</Link> </p>
      </div>

      {/* submit button */}
      <button className='self-end bg-(--secondary-colour) text-white py-2 px-8 rounded-sm font-bold text-sm'>Submit</button>

    </form>
    <div className='text-center flex md:flex-col md:gap-15 gap-2 grow items-center'>
      <h1 className='md:text-2xl lg:text-3xl text-xl font-[headland-one]'>Postings.net</h1>
      <h5 className='lg:text-2xl md:text-xl text-lg'>Welcome</h5>
    </div>


  </div>
}

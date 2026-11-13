import { logout, verifySession } from '#/lib/sharedFunctions'
import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/home/')({
  component: RouteComponent,
  loader: verifySession,
  onError() {
    throw redirect({ from: "/home/", to: "/auth/candidates/login" })
  }
})

// for employers
function RouteComponent() {
  function ManageCardEmployers(key: string) {
    return (<div key={key} className='bg-white px-8 py-5  md:w-full w-fit h-fit border-b-3 border-b-(--secondary-accent) rounded-lg flex flex-col gap-3'>
      <p className='font-medium md:text-lg'>Manage</p>
      <div className='flex flex-col justify-start w-fit text-xs md:text-sm'>
        <button className='w-fit hover:cursor-pointer hover:text-black/60' onClick={() => setAccountType(AccountType.CANDIDATE)} >Switch to candidate account</button>
        <button className='w-fit hover:cursor-pointer hover:text-black/60'>Account</button>
        <button className='w-fit hover:cursor-pointer hover:text-black/60'>Log out</button>
      </div>
    </div>)
  }
  function OpeningsCard(key: string) {
    return (<div key={key} className='bg-white px-8 py-5  h-fit w-fit md:w-full  border-b-3 border-b-(--main-accent) rounded-lg flex flex-col gap-3'>
      <p className=' font-medium md:text-lg'>Your Openings</p>
      <div className='flex flex-col text-xs md:text-sm'>
        <button onClick={() => navigate({ to: "/home/listings/new-listing" })} className='w-fit hover:cursor-pointer hover:text-black/60'>New Opening</button>
        <button onClick={() => navigate({ to: "/home/listings" })} className='w-fit hover:cursor-pointer hover:text-black/60'>Manage Listings</button>
      </div>
    </div>)
  }
  // for candidates
  function ManageCard(key: string) {
    return (<div key={key} className='bg-white px-8 py-5  md:w-full w-fit h-fit border-b-3 border-b-(--secondary-accent) rounded-lg flex flex-col gap-3'>
      <p className='font-medium md:text-lg'>Manage</p>
      <div className='flex flex-col text-xs md:text-sm'>
        <button className='w-fit hover:cursor-pointer hover:text-black/60 transition-colors' onClick={() => setAccountType(AccountType.EMPLOYER)}>Switch to Employer account</button>
        <button className='w-fit hover:cursor-pointer hover:text-black/60 transition-colors'>Track your applications</button>
        <button className='w-fit hover:cursor-pointer hover:text-black/60 transition-colors'>Account</button>
        <button onClick={() => logout(navigate({ to: "/auth/candidates/login" }))} className='w-fit hover:cursor-pointer hover:text-black/60 transition-colors'>Log out</button>
      </div>
    </div>)
  }
  function SearchCard(key: string) {
    return (<div key={key} className='bg-white px-8 py-5  h-fit w-fit md:w-full  border-b-3 border-b-(--main-accent) rounded-lg flex flex-col gap-3'>
      <p className='font-medium md:text-lg'>Search for new openings</p>
      <div className='flex flex-col text-xs md:text-sm'>
        <button className='w-fit hover:cursor-pointer hover:text-black/60 transition-colors'>Newest listings</button>
        <button className='w-fit hover:cursor-pointer hover:text-black/60 transition-colors'>Start a new search</button>
      </div>
    </div>)
  }
  // functions used to render components depending on the type of user
  function CandidateComponents() {
    return [ManageCard(crypto.randomUUID()), SearchCard(crypto.randomUUID())]
  }
  function EmployerComponents() {
    return [ManageCardEmployers(crypto.randomUUID()), OpeningsCard(crypto.randomUUID())]
  }

  enum AccountType {
    EMPLOYER,
    CANDIDATE
  }
  const [accountType, setAccountType] = useState(AccountType.CANDIDATE)
  const navigate = useNavigate({ from: "/home/" })
  return (
    <div className=' flex flex-col justify-between items-center md:items-start min-h-screen bg-(--default-bg) font-[ibm-sans]'>
      <div className='flex flex-col grow md:shrink-0 lg:py-20 lg:px-30 py-10 px-5 justify-between md:justify-start gap-5 w-full'>
        <div className='shrink-2 flex justify-center gap-3 md:justify-between items-center px-10 '>
          <p className='font-[headland-one] lg:text-3xl text-lg'>Postings.net</p>
          <p className='text-sm lg:text-2xl hidden md:block'>Control panel for {accountType == AccountType.CANDIDATE ? "Candidates" : "Employers"}</p>
          <p className='md:hidden text-xs'>Control panel</p>
        </div>
        <main className='grow-2 flex flex-col md:flex-row gap-5 lg:gap-40 md:gap-30 md:px-10  items-center md:items-start lg:pt-30 md:pt-30 justify-center md:justify-around'>
          {accountType == AccountType.CANDIDATE ? CandidateComponents() : EmployerComponents()}
        </main>
      </div>
      <footer className='text-xs px-30 py-5'>postings.net</footer>
    </div>)
}

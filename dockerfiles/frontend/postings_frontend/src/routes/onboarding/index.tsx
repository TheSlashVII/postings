import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import type { JobExperience } from '#/lib/types'

export const Route = createFileRoute('/onboarding/')({
  component: RouteComponent,
})

function RouteComponent() {

  const personalDetailsForm = function () {
    return (
      <div className='lg:px-40 md:30 px-10 py-10 md:gap-20 gap-5  font-[ibm-sans] flex flex-col-reverse md:flex-row items-center justify-around min-h-screen bg-(--default-bg)'>
        <form className='bg-white rounded-lg border-b-3 border-b-(--main-accent) p-7 max-h-fit md:p-10 grow flex flex-col gap-5'>
          <h3 className='font-semibold text-lg'>Let us know more about you</h3>
          {/*input fields*/}
          <div className='flex flex-col gap-1 text-sm'>
            <div className='flex gap-2 min-w-full mt-2'>
              <div className='flex flex-col gap-2 grow'>
                <label>Names</label>
                <input id='name' autoComplete='false' type='text' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='super secret password' />
              </div>
              <div className='flex flex-col gap-2 grow'>
                <label>Surnames</label>
                <input id='surname' autoComplete='false' type='text' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='super secret password' />
              </div>
            </div>
            <div className='flex gap-2 min-w-full'>
              <div className='mt-5 flex flex-col gap-2 grow'>
                <label>Date of birth</label>
                <input id='date_of_birth' autoComplete='false' type='date' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='20/08/1994' />
              </div>
              <div className='mt-5 flex flex-col gap-2 grow'>
                <label>Phone number</label>
                <input id='number' autoComplete='false' type='text' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='+12 344 573 381' />
              </div>
            </div>

            <div className='mt-2 flex flex-col gap-2'>
              <label>City of residence</label>
              <input id='city' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='Your company Ltd' />
            </div>
            <div className='mt-2 flex flex-col gap-2'>
              <label>Country of residence</label>
              <input id='country' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='Explain briefly what you did in your job' />
            </div>
          </div>

          {/* submit button */}
          <button onClick={(e) => switchToJobExperience(e)} className='self-end bg-(--secondary-colour) text-white py-2 px-8 rounded-sm font-bold text-sm outline-0'>Next</button>

        </form>
        <div className='text-center flex md:flex-col md:gap-15 gap-2 grow items-center'>
          <h1 className='md:text-2xl lg:text-3xl text-xl font-[headland-one]'>Postings.net</h1>
          <h5 className='lg:text-2xl md:text-xl text-lg'>Onboarding</h5>
        </div>
      </div>
    )
  }
  const jobExperienceList = function () {

    return (
      <div className='lg:px-40 md:30 px-10 py-10 md:gap-20 gap-5  font-[ibm-sans] flex flex-col-reverse md:flex-row items-center justify-around min-h-screen bg-(--default-bg)'>
        <div className='bg-white rounded-lg border-b-3 border-b-(--main-accent) p-7 max-h-fit md:p-10 grow flex flex-col gap-5'>
          <h3 className='font-semibold text-lg'>Your current job experience</h3>
          {experience.length > 0 ?
            experience.map(element => <div className='border px-2 py-1'>
              <p>{element.position}</p>
              <p>{element.company_name}</p>
              <p> from {String(element.start_date)} {element.end_date ? `to ${element.end_date}` : ""}</p>
            </div>)
            :
            <button onClick={(e) => switchToJobExperienceForm(e)}>+ Add experience</button>
          }

          <button className='self-end bg-(--secondary-colour) text-white py-2 px-8 rounded-sm font-bold text-sm'>Next</button>
        </div>
        <div className='text-center flex md:flex-col md:gap-15 gap-2 grow items-center'>
          <h1 className='md:text-2xl lg:text-3xl text-xl font-[headland-one]'>Postings.net</h1>
          <h5 className='lg:text-2xl md:text-xl text-lg'>Onboarding</h5>
        </div>
      </div>
    )
  }

  const jobExperienceForm = function () {
    return (
      <div className='lg:px-40 md:30 px-10 py-10 md:gap-20 gap-5  font-[ibm-sans] flex flex-col-reverse md:flex-row items-center justify-around min-h-screen bg-(--default-bg)'>
        <form className='bg-white rounded-lg border-b-3 border-b-(--main-accent) p-7 max-h-fit md:p-10 grow flex flex-col gap-5'>
          <h3 className='font-semibold text-lg'>What have you been up to?</h3>
          {/*input fields*/}
          <div className='flex flex-col gap-1 text-sm'>
            <div className='mt-2 flex flex-col gap-2'>
              <label>Position name</label>
              <input onChange={(e) => setPosition(e.target.value)} id='position' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='Professional brick layer' />
            </div>
            <div className='flex gap-2 min-w-full'>
              <div className='mt-5 flex flex-col gap-2 grow'>
                <label>Start date</label>
                <input onChange={(e) => setStartDate(e.target.value)} id='start_date' autoComplete='false' type='date' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='super secret password' />
              </div>
              <div className='mt-5 flex flex-col gap-2 grow'>
                <label>End date</label>
                <input onChange={(e) => setEndDate(e.target.value)} id='end_date' autoComplete='false' type='date' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='super secret password' />
              </div>
            </div>

            <div className='mt-2 flex flex-col gap-2'>
              <label>Company name</label>
              <input onChange={(e) => setCompany(e.target.value)} id='company' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='Your company Ltd' />
            </div>
            <div className='mt-2 flex flex-col gap-2'>
              <label>Description</label>
              <input onChange={(e) => setDescription(e.target.value)} id='description' className='py-1 px-2 border-[0.5px] rounded bg-(--input-accent) border-(--main-accent) outline-0' placeholder='Explain briefly what you did in your job' />
            </div>
          </div>

          {/* submit button */}
          <button onClick={(e) => saveNewJobExperience(e)} className='self-end bg-(--secondary-colour) text-white py-2 px-8 rounded-sm font-bold text-sm'>Save</button>

        </form>
        <div className='text-center flex md:flex-col md:gap-15 gap-2 grow items-center'>
          <h1 className='md:text-2xl lg:text-3xl text-xl font-[headland-one]'>Postings.net</h1>
          <h5 className='lg:text-2xl md:text-xl text-lg'>Onboarding</h5>
        </div>
      </div>
    )
  }
  const saveNewJobExperience = function (e: any) {
    e.preventDefault()
    setCachedExperience({
      position: position,
      start_date: start_date,
      end_date: end_date,
      company_name: company,
      description: description
    })
    experience.push(cachedExperience!)
    switchToJobExperience(e)
  }
  const switchToJobExperienceForm = function (e: any) {
    e.preventDefault()
    setPage(jobExperienceForm())
  }
  const switchToJobExperience = function (e: any) {
    e.preventDefault()
    setPage(jobExperienceList())
  }
  // tracked fields for creating a job experience
  const [position, setPosition] = useState<string>("")
  const [start_date, setStartDate] = useState<string>("")
  const [end_date, setEndDate] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [description, setDescription] = useState<string>("")


  const [cachedExperience, setCachedExperience] = useState<JobExperience>()
  const [experience, setExperience] = useState<JobExperience[]>([])
  const [page, setPage] = useState(personalDetailsForm())
  return (
    <>
      {page}
    </>

  )
}

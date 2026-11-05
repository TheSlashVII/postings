import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState, type MouseEvent } from 'react'
import type { JobExperience } from '#/lib/types'
import { formatDate } from '#/lib/sharedFunctions'

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
            <div>
              <button className='max-w-fit hover:cursor-pointer' onClick={(e) => switchToJobExperienceForm(e)}>+ Add experience</button>
              <div className='max-h-50 overflow-y-scroll gap-2 flex flex-col'>
                {experience.map(element => <div key={element.id} className='border px-2 py-1 rounded'>
                  <p className='font-bold'>{element.position}</p>
                  <p className='text-sm'>{element.company_name}</p>
                  <p className='text-xs'>From {element.start_date.toString()} {element.end_date ? `to ${element.end_date.toString()}` : ""}</p>
                </div>
                )}
              </div>
            </div>
            :
            <button className='max-w-fit hover:cursor-pointer' onClick={(e) => switchToJobExperienceForm(e)}>+ Add experience</button>
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
          <h3 className='font-semibold text-lg'>Add new job experience</h3>
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
          <div className='flex justify-end gap-2'>
            <button onClick={(e) => switchToJobExperience(e)} className='hover:cursor-pointer  text-(--secondary-colour) border-3 border-(--secondary-colour) py-2 px-8 rounded-sm font-bold text-sm'>Back</button>
            <button onClick={(e) => switchToJobExperience(e, true)} className='bg-(--secondary-colour) text-white py-2 px-8 rounded-sm font-bold text-sm'>Save</button>
          </div>

        </form>
        <div className='text-center flex md:flex-col md:gap-15 gap-2 grow items-center'>
          <h1 className='md:text-2xl lg:text-3xl text-xl font-[headland-one]'>Postings.net</h1>
          <h5 className='lg:text-2xl md:text-xl text-lg'>Onboarding</h5>
        </div>
      </div>
    )
  }
  const [experience, setExperience] = useState<(JobExperience & { id: string })[]>([])
  const [position, setPosition] = useState<string>("")
  const [start_date, setStartDate] = useState<string>("")
  const [end_date, setEndDate] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<string>("personalDetails")
  const [triggerUpdate, setTriggerUpdate] = useState<boolean>(false) // used to indicate the page to update the values of the experience list
  /*
  const saveNewJobExperience = function (e: any) {
    e.preventDefault()
    let te: JobExperience & { id: string } = {
      id: crypto.randomUUID(),
      position: position,
      start_date: start_date,
      end_date: end_date,
      company_name: company,
      description: description
    }
    // experience.push(te)
    setExperience((prevExperience) => [...prevExperience, te])
    switchToJobExperience(e)
  }
  const returnToExperienceList = function (e: any) {
    e.preventDefault()
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
  */
  const switchToJobExperienceForm = function (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault()
    setCurrentPage("experienceForm")

  }
  // tracked fields for creating a job experience
  const saveNewJobExperience = function (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault()
    setTriggerUpdate(true)
    setCurrentPage("experienceList")
  }
  const switchToJobExperience = function (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, addChanges: boolean = false) {
    e.preventDefault()
    if (addChanges) {
      setTriggerUpdate(true)
    }
    setTimeout(() => {
      setCurrentPage("experienceList")
    }, 500)
  }

  // page switching
  useEffect(() => {
    switch (currentPage) {
      case "personalDetails":
        setPage(personalDetailsForm())
        break;
      case "experienceList":
        setPage(jobExperienceList())
        break;
      case "experienceForm":
        setPage(jobExperienceForm())
        break;
      default:
        setPage(personalDetailsForm())
        break;
    }


  }, [currentPage])
  useEffect(() => {
    if (triggerUpdate) {
      let newExperience: JobExperience & { id: string } = {
        id: crypto.randomUUID(),
        company_name: company,
        position: position,
        start_date: formatDate(new Date(start_date)),
        description: description ?? "",
        end_date: end_date ? formatDate(new Date(end_date)) : undefined
      }
      setExperience((previousExperience) => [...previousExperience, newExperience])
      setTriggerUpdate(false)
    }

  }, [triggerUpdate])

  const [page, setPage] = useState(personalDetailsForm())
  return (
    <>
      {page}
    </>

  )
}

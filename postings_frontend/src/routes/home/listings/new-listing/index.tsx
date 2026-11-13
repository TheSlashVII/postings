import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { TitleSection } from '..'
import { useState } from 'react'
import type { JobPost } from '#/lib/types'

export const Route = createFileRoute('/home/listings/new-listing/')({
  component: RouteComponent,
})

export function JobPostForm({ postData = null, onChange, onSubmit, isNewPost }: { postData: JobPost | null, onChange: Function | null, onSubmit: Function, isNewPost: boolean }) {

  return (
    <form onSubmit={e => onSubmit(e)} className='flex flex-col  justify-between rounded-lg min-w-full grow bg-white p-5'>
      {/* main form */}
      <div className='flex flex-col md:flex-row gap-10 justify-between rounded-lg min-w-full grow'>
        {/* Titles, experience etc */}
        <div className='flex flex-col gap-3 w-full'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='post_title' className='text-sm'>Title</label>
            {onChange ?
              <input value={postData?.title} onChange={e => onChange({ ...postData, title: e.target.value })} id="post_title" className='border-(--main-accent) border px-2 py-1 rounded outline-0 text-sm w-full bg-(--input-accent)' placeholder='Something interesting' />
              :
              <input value={postData?.title} id="post_title" className='border-(--main-accent) border px-2 py-1 rounded outline-0 text-sm w-full bg-(--input-accent)' placeholder='Something interesting' />
            }
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='experience' className='text-sm'>Years of experience required</label>
            {onChange ?
              <input value={postData?.experience_required} onChange={e => onChange({ ...postData, experience_required: Number(e.target.value) })} id="experience" type='number' className='border-(--main-accent) border px-2 py-1 rounded outline-0 text-sm w-full bg-(--input-accent)' placeholder='5 years' />
              :
              <input value={postData?.experience_required} id="experience" type='number' className='border-(--main-accent) border px-2 py-1 rounded outline-0 text-sm w-full bg-(--input-accent)' placeholder='5 years' />
            }
          </div>
        </div>
        {/* Description */}
        <div className='flex gap-2 flex-col w-full pb-4'>
          <label className='text-sm'>Description </label>
          {onChange ?
            <textarea value={postData?.description} onChange={e => onChange({ ...postData, description: e.target.value, })} placeholder='Describe the full details of the post' className='resize-none grow border-(--main-accent) border px-2 py-1 rounded outline-0 text-sm w-full bg-(--input-accent)' />
            :
            <textarea value={postData?.description} placeholder='Describe the full details of the post' className='resize-none grow border-(--main-accent) border px-2 py-1 rounded outline-0 text-sm w-full bg-(--input-accent)' />
          }
        </div>

      </div>
      {/* Bottom buttons */}
      <div className='flex justify-end gap-3 shrink '>
        {/* <button className='hidden'>Preview</button>  */}
        <button type='submit' className='px-6 py-2 rounded  text-sm font-medium bg-(--secondary-colour) text-white'>{!isNewPost ? "Save" : "Post"}</button>
      </div>
    </form>
  )

}
function RouteComponent() {

  const [pageName, setPageName] = useState("Create listing")
  const handleSubmit = function (e: any) {
    e.preventDefault()
    console.log(formData)
  }
  const [formData, setFormData] = useState<JobPost>({
    description: "",
    experience_required: 0,
    title: "",
    company_name: ""
  })
  function Navbar() {
    return (
      <nav className='flex gap-2 justify-end self-end text-xs'>
        <Link className='hover:cursor-pointer' to='/home'>Control Panel</Link>
        <p>/</p>
        <Link className='hover:cursor-pointer' to='/home/listings'>listings</Link>
        <p>/</p>
        <span className='text-(--main-accent) font-medium'>{pageName}</span>
      </nav>
    )
  }
  return (
    <div className='flex flex-col justify-between items-center md:items-start min-h-screen bg-(--default-bg) font-[ibm-sans]'>
      <div className='flex flex-col grow md:shrink-0 lg:py-10 lg:px-20 py-10 px-5 justify-between md:justify-start gap-10 w-full'>
        <TitleSection sectionName={pageName} />
        <main className='grow-2 flex flex-col gap-2  md:px-10  items-center md:items-start justify-center md:justify-start'>
          <Navbar />
          <JobPostForm isNewPost={true} onSubmit={handleSubmit} postData={formData} onChange={setFormData} />
        </main>
      </div>
      <footer className='text-xs px-30 py-5'>postings.net</footer>

    </div>
  )
}


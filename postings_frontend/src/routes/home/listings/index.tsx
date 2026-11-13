import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { JobPost } from '#/lib/types.ts'
import { useState } from 'react'

export const Route = createFileRoute('/home/listings/')({
  component: RouteComponent,
})


export function ListingCard({ listingData }: { listingData: JobPost }) {

}
export function ListingsGrid() {
  return (
    <div className='bg-white px-5 py-3 flex flex-col justify-between grow w-full rounded border-b-3 border-b-(--main-accent)'>
      <p className='shrink'>Ts</p>
      <div className='grid grid-cols-3 w-full gap-2 grow'>

      </div>
      <p className='shrink'>Footer grid</p>


    </div>
  )

}
export function TitleSection({ sectionName }: { sectionName: string }) {
  return (
    <div className='shrink-2 flex justify-center gap-3 md:justify-between items-center px-10 '>
      <p className='font-[headland-one] lg:text-3xl text-lg'>Postings.net</p>
      <p className='text-sm lg:text-2xl'>{sectionName}</p>
    </div>
  )
}
function RouteComponent() {
  function Navbar() {
    return (
      <nav className='flex gap-2 justify-end text-xs'>
        <button className='hover:cursor-pointer' onClick={() => navigate({ to: "/home" })}>Control Panel</button>
        <p>/</p>
        <span className='text-(--main-accent) font-medium'>{pageName}</span>
      </nav>
    )
  }
  function SearchBar() {
    return (
      <form className='flex justify-between items-center py-5 px-10 w-full bg-white rounded border-b-3 border-b-(--secondary-accent)'>
        <div className='flex gap-5 shrink'>
          <label className='font-medium' htmlFor='searchbar'>Search <input className='bg-(--input-accent) border rounded outline-0 ml-3 text-sm py-0.5 px-2' placeholder='Web development' id='searchbar' />  </label>
          <button type='submit' className='hover:bg-(--secondary-colour)/70 hover:cursor-pointer transition-colors text-[0.6rem] bg-(--secondary-colour) rounded font-medium text-white px-3 py-1'>Submit</button>
        </div>
        <div className='flex gap-3'>
          <p className='font-medium'>Filters</p>
          <div className='text-xs flex gap-1 items-center'>
            <p className=' grow'>From</p>
            <input type='date' className=' shrink-2 bg-(--input-accent) border rounded outline-0 py-0.5 px-2' />
          </div>
          <div className='flex gap-1 text-xs items-center'>
            <p>to</p>
            <input type='date' className=' shrink-2 bg-(--input-accent) border rounded outline-0  py-0.5 px-2' />
          </div>
        </div>
      </form>
    )
  }

  const navigate = useNavigate({ from: "/home/listings/" })
  const [pageName, setPageName] = useState<string>("Listings")
  return (
    <div className='flex flex-col justify-between items-center md:items-start min-h-screen bg-(--default-bg) font-[ibm-sans]'>
      <div className='flex flex-col grow md:shrink-0 lg:py-10 lg:px-20 py-10 px-5 justify-between md:justify-start gap-10 w-full'>
        <div className='flex flex-col justify-between'>
          <TitleSection sectionName={pageName} />
        </div>
        <main className='grow-2 flex flex-col gap-5  md:px-10  items-center md:items-start justify-center md:justify-start'>
          <div className='flex w-full flex-col gap-2 shrink'>
            <Navbar />
            <SearchBar />
          </div>
          <ListingsGrid />

        </main>
      </div>

      <footer className='text-xs px-30 py-5'>postings.net</footer>
    </div>)
}

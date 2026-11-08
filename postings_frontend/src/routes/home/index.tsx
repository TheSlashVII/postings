import { api } from '#/lib/axios'
import { usePrefetchQuery, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/home/')({
  component: RouteComponent,
  loader: async function (context) {
    return await api.get<{ isSessionValid: boolean }>("/user/account/verify_session")
  },
  onError() {
    throw redirect({ from: "/home/", to: "/auth/candidates/login" })
  }
})

function RouteComponent() {
  return <div>Hello "/home/"!</div>
}

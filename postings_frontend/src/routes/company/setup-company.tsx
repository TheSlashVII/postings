import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company/setup-company')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/company/setup-company"!</div>
}

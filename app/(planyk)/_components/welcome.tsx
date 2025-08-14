import { redirect } from 'next/navigation'
import { currentUser, type User } from '@clerk/nextjs/server'

import { formatDateToLocal } from '@/lib/utils'

export default async function Welcome({ user }: { user: User }) {
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <>
      <h1 className='text-4xl font-bold'>Welcome, {fullName}! 👋🏼</h1>
      <p className='text-muted-foreground text-xl'>
        Today, {formatDateToLocal(new Date().toISOString())}
      </p>
    </>
  )
}

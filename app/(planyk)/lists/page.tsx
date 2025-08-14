import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

import Welcome from '../_components/welcome'

export default async function PlanykPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className='mt-20 grid place-content-center'>
      <Welcome user={user} />
      <p className='text-muted-foreground mt-10 text-xl'>
        You have no plans for today. Select a list! 🎉
      </p>
    </div>
  )
}

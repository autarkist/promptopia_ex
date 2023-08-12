'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'

const Provider = ({children, session}) => {
  return (
    // using browser capabilities so write 'use client'
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
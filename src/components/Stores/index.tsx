// ./components/providers.js
'use client'

import { Provider } from 'jotai'

interface ProvidersProps {
  children: React.ReactNode
}

export const JotaiProvider = ({ children }: ProvidersProps) => {(
    <Provider>
      {children}
    </Provider>
  )
}

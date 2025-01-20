import axe from '@axe-core/react'
import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import TagManager from 'react-gtm-module'
import { BrowserRouter } from 'react-router-dom'

import { GTM_AUTH, GTM_ID, GTM_PREVIEW } from 'utils/credentials.ts'
import { ErrorWrapper } from 'wrappers/ErrorWrapper.tsx'
import App from './App.tsx'

const tagManagerArgs = {
  gtmId: GTM_ID,
  auth: GTM_AUTH,
  preview: GTM_PREVIEW,
}

TagManager.initialize(tagManagerArgs)

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000) // Logs violations to the browser console
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorWrapper>
        <App />
      </ErrorWrapper>
    </BrowserRouter>
  </StrictMode>
)

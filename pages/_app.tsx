
import '../styles/global.css'

import {  ChallengesContext, ChallengesProvider} from '../contexts/ChallegensContext'
import { useState } from 'react'




function MyApp({ Component, pageProps }) {
  

  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
      
      

  )}

export default MyApp

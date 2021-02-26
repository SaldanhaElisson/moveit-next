import Head from 'next/head'
import { chdir } from 'process'
import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdowm } from '../components/Countdown'
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from '../components/profile'
import { CountdownProvider } from '../contexts/countDownContext'



import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
        <title>Início | move.it</title>
      </Head>

      <ExperienceBar />
      <CountdownProvider>
      <section>
        <div className="">
          <Profile/>
          <CompletedChallenges/>
          <Countdowm/>
        </div>

        <div>
          <ChallengeBox/>
        </div>
      </section>
      </CountdownProvider>
    </div>

  )
}

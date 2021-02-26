import Head from 'next/head'
import { GetServerSideProps} from 'next';


import { chdir } from 'process'
import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdowm } from '../components/Countdown'
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from '../components/profile'
import { CountdownProvider } from '../contexts/countDownContext'



import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from '../contexts/ChallegensContext';
import { LevelUpModal } from '../components/LevelUpModal';


interface HomeProps{
  level:number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props) {
  return (
    <ChallengesProvider level={props.level}
    currentExperience = {props.currentExperience}
    challengesCompleted = {props.challengeCompleted}>
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
    
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {level, currentExperience, challengesCompleted} =ctx.req.cookies

  return {
    props:{
      level: Number(level), 
      currentExperience: Number(currentExperience), challengesCompleted:Number(challengesCompleted)}
  }
}
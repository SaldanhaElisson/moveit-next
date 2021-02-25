import styles from '../styles/components/ExperienceBar.module.css'

import { ChallengesContext } from '../contexts/ChallegensContext';
import { useContext } from 'react';

export function ExperienceBar() {

    const {currentExperience, experienceToNextLevel} = useContext(ChallengesContext);

    const percentTonextLevel = Math.round(currentExperience *100) /experienceToNextLevel
    return(
        <header className={styles.experienceBar}>
            <span>0px</span>
            <div>
                <div style={{width:`${percentTonextLevel}%`}}/>

                <span className={styles.currentExperience} style={{left:`${percentTonextLevel}%`}}>
                    {currentExperience}px
                </span>
               </div>
                <span>{experienceToNextLevel}px</span>
        </header>
    )
}
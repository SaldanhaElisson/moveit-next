import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallegensContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {

    const { level}=useContext(ChallengesContext)
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/SaldanhaElisson.png" alt=" perfil" />
            <div>
                <strong>Users </strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}
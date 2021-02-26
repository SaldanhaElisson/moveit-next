import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallegensContext';
import { CountDonwContext } from '../contexts/countDownContext';
import Styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){
    const {activeChallenge, resertChallenge, completChallenge}= useContext(ChallengesContext)
    const {resetCountdown} = useContext(CountDonwContext)


    function handleChallengeSuccedde (){

        completChallenge();
        resetCountdown();
    }

    function handleChalleneFailed (){

        resertChallenge();
        resetCountdown();

    }

    

    return(
        
        <div className={Styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={Styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type="button"
                        className={Styles.challengeFailedButton}
                        onClick={ handleChalleneFailed}>
                            Falhei
                        </button>

                        <button
                        type="button"
                        onClick={handleChallengeSuccedde}
                        className={Styles.challengeSuccedButton}>
                            Completei
                        </button>
                    </footer>

                </div>
            ):(
                 <div className={Styles.challengeNoActive}>
                 <strong>Finalize um ciclo para receber um desafio</strong>
                 <p>
                     <img src="icons/level-up.svg" alt="level up"/>
                     Avance de level completando desafios.
                 </p>
             </div>
            )}
           
        </div>
    )
}
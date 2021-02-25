import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallegensContext';
import styles from '../styles/components/Countdowm.module.css'


let countdownTimeout: NodeJS.Timeout;
export function Countdowm() {

    const {startNewChallenge} =useContext(ChallengesContext)



    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const[hasFinished, setHasFinish]= useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function starCountdonw() {
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout); //clear  functionf
        setIsActive(false);
        setTime(0.05*60);

    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if(isActive && time===0){
            setHasFinish(true);
            setIsActive(false);
            startNewChallenge();


        }
    }, [isActive, time]) //contador 

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {hasFinished ? (
               <button type="button"
               disabled
               className={styles.CountdonwButton}
               >
               Ciclo encerrado
           </button>
            ) : (
                <>
                {isActive ? (<button type="button"
                className={`${styles.CountdonwButton} ${styles.CountdonwButtonActive}`}
                onClick={resetCountdown}>
                Abandonar ciclo
            </button>
            ) : (<button type="button"
                className={styles.CountdonwButton}
                onClick={starCountdonw}
            >
                Iniciar um ciclo
            </button>)
            }
                </> //precisar estar em torno de um fragment
            )}

           



        </div >
    )
}
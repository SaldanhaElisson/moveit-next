import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallegensContext';
import { CountDonwContext } from '../contexts/countDownContext';
import styles from '../styles/components/Countdowm.module.css'



export function Countdowm() {
    const { minutes,
        seconds,
        hasFinished,
        isActive,
        resetCountdown,
        starCountdonw
    } = useContext(CountDonwContext)


    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


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
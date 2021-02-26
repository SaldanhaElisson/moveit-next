import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ChallengesContext } from "./ChallegensContext";

interface CountDonwContext {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    starCountdonw: () => void;
    resetCountdown: () => void;
}

interface CountDonwProviderProps {
    children: ReactNode;
}

export const CountDonwContext = createContext({} as CountDonwContext)

export function CountdownProvider({ children }) {
    const { startNewChallenge } = useContext(ChallengesContext)

    let countdownTimeout: NodeJS.Timeout;

    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinish] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function starCountdonw() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout); //clear  function

        setHasFinish(false);
        setIsActive(false);
        setTime(0.05 * 60);

    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinish(true);
            setIsActive(false);
            startNewChallenge();


        }
    }, [isActive, time]) //contador 

    return (
        <CountDonwContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            starCountdonw,
            resetCountdown
        }}>
            {children}
        </CountDonwContext.Provider>
    )
}
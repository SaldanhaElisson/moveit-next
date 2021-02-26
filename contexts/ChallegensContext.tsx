import { match } from 'assert';
import {createContext, useState, ReactNode, useEffect} from 'react'

import challenges from '../challenges.json'

interface Challenge{
    type: 'body' | 'eye'
    description: string;
    amount: number;

}

interface ChallengesContextData {
    level:number;
    activeChallenge: Challenge;
    currentExperience:number;
    challengesCompleted:number;
    levelUp:() => void;
    startNewChallenge:() => void;
    resertChallenge:() => void;
    experienceToNextLevel:number;
    completChallenge:() => void;
        
}
interface ChallengesProviderProps {
    children:  ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children}:ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperencie]= useState(0);
    const[ challengesCompleted, setChallengesCompleted]= useState(0);

    const [activeChallenge, setActiveChallenge]= useState(null);

    const experienceToNextLevel= Math.pow((level+1) *4, 2)

    useEffect(() => {
      Notification.requestPermission();
    },[]) //acontece uma unica vez quando estiver exibindo em tela , nesse caso permitir notificações

  function levelUp(){

    setLevel(level+1);

  }
  function startNewChallenge(){
      const randomChallengeIndex = Math.floor(Math.random() *challenges.length);

        const challenge = challenges[randomChallengeIndex]; //selecionando um desafio por meio do json(API)

        setActiveChallenge(challenge);

        new Audio('/public/notification.mp3')

        if (Notification.permission === 'granted') {
          new Notification('Novo desafio ⏲', {
            body: `Valendo ${challenge.amount}xp!`
          })
        }

  }

  function resertChallenge(){
      setActiveChallenge(null);

  }

  function completChallenge(){
    if (!activeChallenge){
      return;
    }

    const {amount} = activeChallenge;

    let finalExperience = currentExperience + amount; 

    if (finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

      setCurrentExperencie(finalExperience);
      setActiveChallenge(null);
      setChallengesCompleted(challengesCompleted+1);


  }


  return(
    <ChallengesContext.Provider value={{level, currentExperience, challengesCompleted, levelUp,startNewChallenge,
        activeChallenge,
        resertChallenge,experienceToNextLevel,completChallenge}}>
        {children}

    </ChallengesContext.Provider>
  );
}

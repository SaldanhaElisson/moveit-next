import { match } from 'assert';
import Cookies from 'js-cookie';
import {createContext, useState, ReactNode, useEffect} from 'react'

import challenges from '../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';
import {  } from '../styles/components/LevelUpModal.module.css';

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
    closeLevelUpmodal: () => void;
        
}
interface ChallengesProviderProps {
    children:  ReactNode;
    level:number;
    currentExperience: number;
    challengesCompleted: number;
 
    
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest}:ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperencie]= useState(rest.currentExperience ?? 1);
    const[ challengesCompleted, setChallengesCompleted]= useState(rest.challengesCompleted ?? 1);

    const [activeChallenge, setActiveChallenge]= useState(null);

    const experienceToNextLevel= Math.pow((level+1) *4, 2)
    const [isLevelUpModalOpen, SetIsLevelUpModalOpen] = useState(false)

    useEffect(() => {
      Notification.requestPermission();
    },[]) //acontece uma unica vez quando estiver exibindo em tela , nesse caso permitir notificações

    useEffect(() => {
      Cookies.set('level', String(level))
      Cookies.set('challengesCompleted', String(challengesCompleted))
      Cookies.set('currentExperience', String(currentExperience))
    },
    [level, currentExperience, challengesCompleted] ) //salvar dados no cookies

  function levelUp(){

    setLevel(level+1);
    SetIsLevelUpModalOpen(true);

  }

  function closeLevelUpmodal(){
    SetIsLevelUpModalOpen(false);
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
        resertChallenge,experienceToNextLevel,completChallenge,
        closeLevelUpmodal}}>
        {children}

      {isLevelUpModalOpen && <LevelUpModal/>} 

      </ChallengesContext.Provider>
  );
}



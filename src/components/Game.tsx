import React, { useState, useEffect } from "react"
import './game.css' 
import RepoCard from "./RepoCard"
import { FaCheckCircle, FaExchangeAlt, FaTimesCircle } from 'react-icons/fa'

interface GameProps {
    repoState: [Repo[], React.Dispatch<React.SetStateAction<Repo[]>>]
    originalList: Repo[]
    setShowGame: React.Dispatch<React.SetStateAction<boolean>>

}

const Game: React.FC<GameProps> = ( {
    repoState,
    originalList,
    setShowGame,
}) => {
    const [repositories, setRepositories] = repoState
    const [over, setOver] = useState<boolean>(false)
    const [repo2, setRepo2] = useState<Repo | null>(null)
    const [repo1, setRepo1] = useState<Repo | null>(null)
    const [correct, setCorrect] = useState<number>(0)
    const [wrong, setWrong] = useState<number>(0)
    const resultScore = correct > wrong ? "You Won 😎 "  : correct === wrong ? "Wow Almost in"  : "You Lost 😕"
    const resultClass = correct > wrong ? "statusGame icon-correct"  : correct === wrong ? "statusGame" : "statusGame icon-wrong"
   
    const randomSelect = (arr: Repo[]) => {
        // If there are less than 2 repositories, reset the list
        if (arr.length < 2){
            setRepositories(originalList)
            setOver(true)
            return
        }
        // Select a random index from the array
        const generateRandom = () => Math.floor(Math.random() * arr.length)
        const randomIndex1 = Math.floor(Math.random() * arr.length)
        let randomIndex2 = Math.floor(Math.random() * arr.length)
        
        while (randomIndex1 === randomIndex2){
            randomIndex2 = generateRandom()
        }
        //Select the two repositories with those indexes 
        const randomRepo1 = arr[randomIndex1] 
        const randomRepo2 = arr[randomIndex2] 
        //Remove the two repositories from the array
        const updatedArr = arr.filter(
            repo=>repo.id !== randomRepo1.id && repo.id !== randomRepo2.id,
            )    

            //Set repos with the repo values

            setRepo1(randomRepo1)
            setRepo2(randomRepo2)

            // Update the array
            setRepositories(updatedArr)
    }

    //Set initial repos

    useEffect( () => {
        randomSelect(repositories)
    }, [])

    // Handelers

    const handleChoice = (r: Repo) => {
        const chosenRepo = r.id === repo1?.id ? repo1 : repo2
        const winner = repo1?.stargazers_count! > repo2?.stargazers_count! ? repo1 : repo2

        if (chosenRepo?.id === winner?.id) {
            setCorrect((prev) => prev + 1)
        }else{
            setWrong((prev) => prev + 1)
        }

        randomSelect(repositories)
    }

    return (
         <div className="game">
            {over ? (<div className="score">
                        <div className="cardDash">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="card-inner">
                                    <div className="styleDash">
                                        <h1 className={resultClass}> {resultScore} </h1>
                                        <div className="resultScore">
                                            <div>
                                                <label className="icon-correct" >Correct</label>
                                                <h1 className="correct">
                                                    {correct}
                                                    <FaCheckCircle className="icon-correct"/>
                                                </h1>
                                            </div>
                                            <FaExchangeAlt className="icon-versus"/>
                                            <div>
                                                <label className="icon-wrong" >Wrong</label>
                                                <h1 className="wrong">
                                                   {wrong}
                                                    <FaTimesCircle className="icon-wrong"/>
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            ) : (
                repo1 && repo2 && <div className="repos">
                    <h1 className="title">Choose the Repo with most Stars!</h1>
                    <div className="container">
                        
                        {/* TODO: Create component for the Repo */}
                       <RepoCard content={repo1} handler={handleChoice} />
                       

                        <div className="dashboard">
                            <div className="result correct">
                                <label className="icon-correct">Correct</label>
                                <p>{correct}</p>
                                <FaCheckCircle className="icon-correct"/>
                            </div>

                            <FaExchangeAlt className="icon-versus"/>

                            <div className="result wrong">
                                <label className="icon-wrong">Wrong</label>
                                <p>{wrong}</p>
                                <FaTimesCircle className="icon-wrong" />
                            </div>
                        </div>

                        <RepoCard content={repo2} handler={handleChoice}/>
                    </div>
                </div>
                
            )}
     
            <div className="buttons playAgain">
                
                {!over && (
                    <button type="submit" 
                    className="learn-more" 
                    // TODO: change this button to refresh the current repositores
                    onClick={() => randomSelect(repositories) }>
                        Skip
                    </button>
                )}
                
                <button type="submit" className="learn-more" onClick={() =>setShowGame(false)}>
                    {over ? 'Play Again' : 'Back'}
                </button>
            </div>
         </div>
    )
}

export default Game
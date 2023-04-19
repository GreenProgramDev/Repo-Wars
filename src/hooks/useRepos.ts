import { Dispatch, SetStateAction, useEffect, useState } from "react"

const fetchRepos = async (
    amount: number, 
    setters: Dispatch<SetStateAction<any[]>>[],
     ) => {
        const res = { data: ["repo1", "repo2"]}
        setters.forEach( (setter) => setter(res.data) )
     }

const useRepos = (amount: number) => {
    //cria um estado pra todos os repositorios 
    const [allRepos, setAllRepos] = useState<any>([])
    // cria um estado pros repositorios
    const [repositories, setRepositories] = useState<any>([])
    // um useEffect [ra reci[erar ps repositorios do GH
    useEffect(() => {
        // executa funcao async
        fetchRepos(amount, [setAllRepos, setRepositories])
    }, [])
    // retorna [repositorios, setRepositorios]
    return [repositories, setRepositories, allRepos]

}


export default useRepos
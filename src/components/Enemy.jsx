import '../styles/gwBush.scss'

//Importing useSelector hook to be able to "listen" to the Redux store
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import {useState} from 'react'
import {useRef} from 'react'


const Enemy = (props) => {

    const dispatch = useDispatch();

    


    //Setting Hook on global state position for the Projectiles
    const currentProjectilesPositions = state => state.projectiles;
    const storeProjectiles = useSelector(currentProjectilesPositions)

    const storeWaveNumber = state => state.waveCount;
    const waveNumber = useSelector(storeWaveNumber)

    const storeEnemy = state => state.enemies[waveNumber][props.id];
    const currentEnemy = useSelector(storeEnemy)

    //Redux Hook
    const storeIsItDead = state => state.enemies[waveNumber][props.id].dead;
    const isItDead = useSelector(storeIsItDead)


    //Creating the reference we'll assign to the square.
    const inputRef = useRef();

    useEffect(() => {
        let timeOutReference = null;
        if (isItDead === true) {
            inputRef.current.className = "gwbush gwbush--dead"
            /*dispatch({ type: 'enemy/descend', payload: {'position': -10, 'id': props.id }})*/
        } else {
        //Checking if the coordinates match to define the right styling
        if (storeProjectiles.length > 0) {
        storeProjectiles.slice(-10).map(projectile => {
            if (projectile.dead === false && (Math.abs(projectile.x - currentEnemy.x) <=5) && (Math.abs(projectile.y - currentEnemy.y)<=5)) {
                dispatch({ type: 'killCount/add', payload: 1})
                dispatch({ type: 'projectile/setDead', payload: {'dead': true, 'id': projectile.id }})
                dispatch({ type: 'enemy/setDead', payload: {'waveNumber': waveNumber, 'dead': true, 'id': props.id }})
                /*setHaveBeenKilled(true)    */        
            } else {
                inputRef.current.className = currentEnemy.style
            }
        })
        }
        
        if (currentEnemy.y < 100) {
            timeOutReference =  setTimeout(() => 
            dispatch({ type: 'enemy/descend', payload: 
            {'waveNumber': waveNumber, 'position': (parseInt(currentEnemy.y)+1).toString(), 'id': props.id }})
            , 100)
        } else {
            dispatch({ type: 'lifeCount/decrease', payload: true})
            dispatch({ type: 'killCount/add', payload: 1})
            dispatch({ type: 'enemy/setDead', payload: {'waveNumber': waveNumber, 'dead': true, 'id': props.id }})

        }
      }
    })

      return (
            <div className = {currentEnemy.style} style = {{top:currentEnemy.y + "vh", left: currentEnemy.x + "vh"}} ref={inputRef}></div> 
      )
    }

   
export default Enemy
import '../styles/enemy.scss'

//Importing redux specific hooks
import { useSelector, useDispatch } from "react-redux"
//importing useEffect to handle behavior after render.
import { useEffect } from 'react'
//Importing useState for local states.
import {useState} from 'react'
//Importing useRef to be able to assign references to elements to access them in useEffect
import {useRef} from 'react'


const Enemy = (props) => {

    const dispatch = useDispatch();

    // Setting Hook on global state position for the Projectiles
    const currentProjectilesPositions = state => state.projectiles;
    const storeProjectiles = useSelector(currentProjectilesPositions)

    // Getting current wave number from the store.
    const storeWaveNumber = state => state.waveCount;
    const waveNumber = useSelector(storeWaveNumber)

    // Get the Current Enemy from the store
    const storeEnemy = state => state.enemies[waveNumber][props.id];
    const currentEnemy = useSelector(storeEnemy)

    // Get the Death Status for current enemy from the store
    const storeIsItDead = state => state.enemies[waveNumber][props.id].dead;
    const isItDead = useSelector(storeIsItDead)

    // Get the enemy LifeCount from the store
    const storeHealth = state => state.enemies[waveNumber][props.id].enemyType.health;
    const health = useSelector(storeHealth)

    // A constant holding the timestamp of the last time the enemy fired.
    const [timeOfLastFire , setTimeOfLastFire] = useState(Date.now())

    //Creating the reference we'll assign to the enemy
    const inputRef = useRef();

    useEffect(() => {
        /*On render*/
        /* Check if the enemy has O lives, and is not yet marked as dead*/
        if (health === 0 && isItDead === false) {
            //Mark the current enemy as dead in the store. Also increase killcount by one. 
            dispatch({ type: 'killCount/add', payload: 1})
            dispatch({ type: 'enemy/setDead', payload: {'waveNumber': waveNumber, 'dead': true, 'id': props.id }})
        }

        /*If the enemy is marked as Dead, we change its class so it displays as dead*/
        if (isItDead === true) {
            inputRef.current.className = "enemy enemy--dead"
        } else {
            //If the enemy is of the shooting type and the last time it fired was more than 4 seconds ago, we fire. 
            if (currentEnemy.enemyType.attacksFromADistance === true && Date.now() - timeOfLastFire > 4000)  {
                dispatch({ type: 'projectile/spawn', payload: {'positionX' : parseInt(currentEnemy.x), 'positionY' : parseInt(currentEnemy.y), 'type' : "enemy"}})
                setTimeOfLastFire(Date.now())
            }

        //If there are projectiles active...
            if (storeProjectiles.length > 0) {
            storeProjectiles.slice(-10).map(projectile => {
                //We check if we are colliding with one of them, of the right type.
                if (projectile.dead === false && projectile.type === "player" && (Math.abs(projectile.x - currentEnemy.x) <=5) && (Math.abs(projectile.y - currentEnemy.y)<=5)) {
                    //If we are, then we set the projectile to dead, and decrease the health of the enemy
                    dispatch({ type: 'projectile/setDead', payload: {'dead': true, 'id': projectile.id }})
                    dispatch({ type: 'enemy/decreaseHealth', payload: {'waveNumber': waveNumber, 'amount': 1, 'id': props.id }})  
                } else  {
                    //If we are not colliding, assign the display class to the enemy for normal display. 
                    inputRef.current.className = "enemy enemy--"+currentEnemy.enemyType.className
                }
            })
            }
        //If the enemy did not reach the boudary yet (upper or lower depending its type)
        if (currentEnemy.y < 100 || currentEnemy.y <= 0) {
            //We dispatch a new position for the enemy every 100ms to make it move
            setTimeout(() => 
            dispatch({ type: 'enemy/descend', payload: 
            {'waveNumber': waveNumber, 'position': (parseInt(currentEnemy.y)+1*currentEnemy.enemyType.speed).toString(), 'id': props.id }})
            , 100)

        //If the enemy reached the boudary, we decrease the player lifecount, increase killcount and kill the enenmy. 
        } else {
            dispatch({ type: 'lifeCount/decrease', payload: true})
            dispatch({ type: 'killCount/add', payload: 1})
            dispatch({ type: 'enemy/setDead', payload: {'waveNumber': waveNumber, 'dead': true, 'id': props.id }})
        }
      }
    })

      return (
            <div className = {"enemy enemy--"+currentEnemy.enemyType.className} style = {{top:currentEnemy.y + "vh", left: currentEnemy.x + "vh"}} ref={inputRef}></div> 
      )
    }

   
export default Enemy
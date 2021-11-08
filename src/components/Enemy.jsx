import '../styles/gwBush.scss'

//Importing useSelector hook to be able to "listen" to the Redux store
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import {useState} from 'react'
import {useRef} from 'react'


const Enemy = (props) => {

    const dispatch = useDispatch();

    //Redux Hook
    const storePositionX = state => state.enemies[props.id].x;
    const positionX = useSelector(storePositionX)

    //Redux Hook
    const storePositionY = state => state.enemies[props.id].y;
    const positionY = useSelector(storePositionY)

    /*//Setting Hook on global state position for the MovingObject
    const currentMovingObjectPosition = state => state.boratPosition;
    const storeMovingObjectPosition = useSelector(currentMovingObjectPosition)*/

    //Setting Hook on global state position for the Projectiles
    const currentProjectilesPositions = state => state.projectiles;
    const storeProjectilePosition = useSelector(currentProjectilesPositions)

    //Setting up Hook for havBeenKilledFlag
    const [haveBeenKilled, setHaveBeenKilled] = useState(false);

    //Redux Hook
    const storeIsItDead = state => state.enemies[props.id].dead;
    const isItDead = useSelector(storeIsItDead)

    //Creating the reference we'll assign to the square.
    const inputRef = useRef();

    useEffect(() => {

        
        
        if (isItDead === true) {
            inputRef.current.className = "gwbush gwbush--dead"
            dispatch({ type: 'enemy/descend', payload: {'position': -10, 'id': props.id }})
        } else {
        //Checking if the coordinates match to define the right styling
        storeProjectilePosition.map(projectile => {
            if ((Math.abs(projectile.x - positionX) <=5) && (Math.abs(projectile.y - positionY)<=5)) {
                dispatch({ type: 'killCount/increase', payload: null})
                dispatch({ type: 'enemy/setDead', payload: {'dead': true, 'id': props.id }})
                /*setHaveBeenKilled(true)    */        
            } else {
                inputRef.current.className = "gwbush"
            }
        })

        if (positionY < 100) {
            setTimeout(() => {
              dispatch({ type: 'enemy/descend', payload: {'position': (parseInt(positionY) + 2).toString(), 'id': props.id }})
          }
          , 500)
        }
      }
    })
      return (
            <div className = "gwbush" style = {{top:positionY + "vh", left: positionX + "vh"}} ref={inputRef}></div> 
      )
    }

   
export default Enemy
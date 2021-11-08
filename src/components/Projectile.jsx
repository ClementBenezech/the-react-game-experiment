import '../styles/projectile.scss'

//Importing useSelector hook to be able to "listen" to the Redux store
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import {useState} from 'react'
import {useRef} from 'react'


const Projectile= (props) => {

    const dispatch = useDispatch();

    //Redux Hook
    const storePositionX = state => state.projectiles[props.id].x;
    const positionX = useSelector(storePositionX)
    
    //Redux Hook
    const storePositionY = state => state.projectiles[props.id].y;
    const positionY = useSelector(storePositionY)

    //Setting Hook on global state position for the enemies
    const currentEnemiesPositions = state => state.enemies;
    const storeEnemiesPosition = useSelector(currentEnemiesPositions)

    //Setting up Hook for havBeenKilledFlag
    const [haveBeenKilled, setHaveBeenKilled] = useState(false);

    //Creating the reference we'll assign to the square.
    const inputRef = useRef();

    useEffect(() => {


        storeEnemiesPosition.map(enemy => {

        if (enemy.dead === false) {
        
        if (haveBeenKilled) {
            inputRef.current.className = "projectile projectile--dead"

            
        } else {
        //Checking if the coordinates match to define the right styling

        if ((Math.abs(enemy.x - positionX) <=5) && (Math.abs(enemy.y - positionY)<=5)) {
            setHaveBeenKilled(true)  
        } else {
            inputRef.current.className = "projectile"
        }
        if (positionY < 100) {
            setTimeout(() => {
              dispatch({ type: 'projectile/elevate', payload: {'position': (parseInt(positionY) - 2).toString(), 'id': props.id }})
          }
          , 50)
          }
      }
    }
    })
    
    
    
    
    })
      return (
            <div className = "projectile" style = {{top:positionY + "vh", left: positionX + "vh"}} ref={inputRef}></div> 
      )
    }

   
export default Projectile
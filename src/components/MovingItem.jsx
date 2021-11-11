import '../styles/fancySquare.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import Projectile from './Projectile';

const MovingItem = (props) => {

    const dispatch = useDispatch()
    
    //Creating the reference we'll assign to the Saucer
    const inputRef = useRef();

    //Adding behavior on render: give focus to the Saucer
    useEffect(() => {
        inputRef.current.focus();
      })

    //Setting Hook on global state position for this object
    const currentPosition = state => state.boratPosition;
    const storePosition = useSelector(currentPosition)

    const currentProjectilesPositions = state => state.projectiles;
    const storeProjectiles = useSelector(currentProjectilesPositions)

    //checking the last time the player fired a projectile
    const [timeOfLastFire , setTimeOfLastFire] = useState(Date.now())

    //handling position changing scenarios in a function

    const moveAround = (key) => {
        
        if (key === "ArrowLeft") {
            if (storePosition.x >= 2) {
                 dispatch({type: 'borat/putXPosition', payload: parseInt(storePosition.x)-5}
                 
                )}
        } else if (key === "ArrowRight" ) {
            if (storePosition.x <=92) {
                dispatch({type: 'borat/putXPosition', payload: parseInt(storePosition.x)+5}
                )}
            }
            if (key === " " && (Date.now() - timeOfLastFire) > 200) {
                dispatch({ type: 'projectile/spawn', payload: {'positionX' : parseInt(storePosition.x), 'positionY' : parseInt(storePosition.y), 'type' : "player"}})
                setTimeOfLastFire(Date.now())
            }
        }
    //If there are projectiles in the store, we check if they collide with the player and if they can hurt us.
    if (storeProjectiles.length > 0) {
            storeProjectiles.map(projectile => {
                if (projectile.dead === false && projectile.type === "enemy" && (Math.abs(projectile.x - storePosition.x) <=5) && (Math.abs(projectile.y - storePosition.y)<=5)) {
                    //We decrease the player's lifeCount, and kill the projectile
                    dispatch({ type: 'projectile/setDead', payload: {'dead': true, 'id': projectile.id }})
                    dispatch({ type: 'lifeCount/decrease', payload: true})        
                } 
            })
            }

        

    //Returning the player 
    return <div tabIndex = '0' className = "fancy-square" style = {{top:storePosition.y + "vh", left: storePosition.x + "vh"}} onKeyDown = { e => {
            e.preventDefault();
            moveAround(e.key);
        }}  ref={inputRef}></div>
}
export default MovingItem
//Import SCSS stylesheet.
import '../styles/projectile.scss'

//Importing redux specific hooks
import { useSelector, useDispatch } from "react-redux"
//importing useEffect to handle behavior after render.
import { useEffect } from 'react'
//importing useRef to be able to assign a ref to the element.
import {useRef} from 'react'


const Projectile= (props) => {

    const dispatch = useDispatch();

    // Get current projectile from the store.
    const storeProjectile = state => state.projectiles.find(projectile => projectile.id == props.id);
    const currentProjectile = useSelector(storeProjectile)

    // Creating the reference we'll assign to the projectile
    // This will allow us to reassign the classname to the component in useEffect
    const inputRef = useRef();

    useEffect(() => {
        //If the projectile not dead, do some stuff
        if (currentProjectile.dead !== true) {
            //we assign the className value from the state.
            inputRef.current.className = "projectile--"+currentProjectile.type
            //If current projectile Y position is within the grid limits
            if (currentProjectile.y <= 100 && currentProjectile.y >= 0 ) {
                //We make the projectile move, to the bottom or the top of the screen depending on the type of projectile.
                if (currentProjectile.type === "player") {
                        setTimeout(() => {
                        dispatch({ type: 'projectile/elevate', payload: {'positionY': (parseInt(currentProjectile.y) - 10).toString(),  'id': props.id }})
                        }
                        , 50)
                } else {
                    if (currentProjectile.type === "enemy") {
                        setTimeout(() => {
                        dispatch({ type: 'projectile/elevate', payload: {'positionY': (parseInt(currentProjectile.y) + 10).toString(), 'id': props.id }})
                        }, 300)
                    }
                }
            } else {
                //If the projectile is out of bounds, it is set to dead.
                dispatch({ type: 'projectile/setDead', payload: {'dead': true, 'id': currentProjectile.id }})
            }    
        }
        else if (currentProjectile.dead === true && currentProjectile.timeOfDeath === null) {
            /*We give it the dead class*/
            inputRef.current.className = "projectile--"+currentProjectile.type+" projectile--"+currentProjectile.type+'--dead' 
            /* We set time of death. Whenever the projectile has been dead more than 1 second,
            we'll stop rendering it on the grid (see GameGrid.jsx).*/
            dispatch( {'type': 'projectile/setTimeOfDeath', payload: {'id': props.id , 'timeOfDeath' : Date.now()}})
        }
        
    })
    //We assign a ref to the projectile
      return (
            <div className = {"projectile--"+currentProjectile.type} style = {{top:currentProjectile.y + "vh", left: currentProjectile.x + "vh"}} ref={inputRef}></div> 
      )
    }

   
export default Projectile
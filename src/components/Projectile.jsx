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

    //Setting up Hook for deadFlag in redux
    const currentDeadFlag = state => state.projectiles[props.id].dead;
    const storeDeadFlag = useSelector(currentDeadFlag);

    //Creating the reference we'll assign to the square.
    const inputRef = useRef();

    useEffect(() => {
        
        if (storeDeadFlag === true) {
            inputRef.current.className = "projectile projectile--dead"
        } else {
            inputRef.current.className = "projectile"
        }
        if (positionY != -10) {
            setTimeout(() => {
              dispatch({ type: 'projectile/elevate', payload: {'position': (parseInt(positionY) - 5).toString(), 'id': props.id }})
          }
          , 50)
          }    
    })
      return (
            <div className = "projectile" style = {{top:positionY + "vh", left: positionX + "vh"}} ref={inputRef}></div> 
      )
    }

   
export default Projectile
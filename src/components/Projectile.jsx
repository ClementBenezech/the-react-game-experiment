import '../styles/projectile.scss'

//Importing useSelector hook to be able to "listen" to the Redux store
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import {useState} from 'react'
import {useRef} from 'react'


const Projectile= (props) => {

    const dispatch = useDispatch();

    const storeProjectile = state => state.projectiles.find(projectile => projectile.id == props.id);
    const currentProjectile = useSelector(storeProjectile)

    //Creating the reference we'll assign to the square.
    const inputRef = useRef();

    useEffect(() => {

        if (currentProjectile.dead === true) {
            inputRef.current.className = "projectile projectile--dead"

        } else {
            inputRef.current.className = "projectile"
            if (currentProjectile.y >= -10) {
                setTimeout(() => {
                  dispatch({ type: 'projectile/elevate', payload: {'position': (parseInt(currentProjectile.y) - 10).toString(), 'id': props.id }})
              }
              , 50)
              }
            else {
                dispatch({ type: 'projectile/setDead', payload: {'dead': true, 'id': currentProjectile.id }})
            }    
        }
        
    })
      return (
            <div className = "projectile" style = {{top:currentProjectile.y + "vh", left: currentProjectile.x + "vh"}} ref={inputRef}></div> 
      )
    }

   
export default Projectile
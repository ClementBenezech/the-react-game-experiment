import '../styles/gwBush.scss'

//Importing useSelector hook to be able to "listen" to the Redux store
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import {useState} from 'react'
import {useRef} from 'react'


const FixedItem = (props) => {

    //Setting Hook on global state position for this object
    //const currentPosition = state => state.GWBushPosition;
    //const storePosition = useSelector(currentPosition)

    const dispatch = useDispatch();

    const storePositionX = props.xPosition;
    const storePositionY = props.yPosition;

    //Setting Hook on global state position for the MovingObject
    const currentMovingObjectPosition = state => state.boratPosition;
    const storeMovingObjectPosition = useSelector(currentMovingObjectPosition)

    //Creating the reference we'll assign to the square.
    const inputRef = useRef();

    useEffect(() => {
        //Checking if the coordinates match to define the right styling
        if ((storeMovingObjectPosition.x == storePositionX) && (storeMovingObjectPosition.y == storePositionY)) {
            inputRef.current.className = "gwbush gwbush--contact"
            dispatch({ type: 'lifeCount/decrease', payload: null})
        } else {
            inputRef.current.className = "gwbush"
        }
      })
      return (
            <div className = "gwbush" style = {{top:storePositionY + "vh", left: storePositionX + "vh"}} ref={inputRef}></div> 
      )
    }

   
export default FixedItem
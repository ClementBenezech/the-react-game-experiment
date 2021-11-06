import '../styles/fancySquare.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';

const MovingItem = (props) => {

    const dispatch = useDispatch()
    
    //Creating the reference we'll assign to the square.
    const inputRef = useRef();

    //Adding behavior on render: give focus to the square.
    useEffect(() => {
        inputRef.current.focus();
      })

    //Setting Hook on global state position for this object
    const currentPosition = state => state.boratPosition;
    const storePosition = useSelector(currentPosition)

    //handling position changing scenarios in a function

    const moveAround = (key) => {
        if (key === "ArrowDown") {
            if (storePosition.y <= 89) {
                dispatch({ type: 'borat/putYPosition', payload: parseInt(storePosition.y)+1})
            }
        } else if ( key === "ArrowUp") {
            if (storePosition.y >= 1) {
                dispatch({ type: 'borat/putYPosition', payload: parseInt(storePosition.y)-1})
                }
        } else if ( key === "ArrowLeft") {
            if (storePosition.x >= 1) {
                dispatch({ type: 'borat/putXPosition', payload: parseInt(storePosition.x)-1})
            }
        } else if ( key === "ArrowRight") {
            if (storePosition.x <= 89) {
                dispatch({ type: 'borat/putXPosition', payload: parseInt(storePosition.x)+1})
            }
        }
    }

    //Returning the square element   
    return <div tabIndex = '0' className = "fancy-square" style = {{top:storePosition.y + "vh", left: storePosition.x + "vh"}} onKeyDown = { e => {
            e.preventDefault();  
            moveAround(e.key)
    }} ref={inputRef}></div>
}
export default MovingItem
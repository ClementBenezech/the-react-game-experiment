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

    //Adding Hook for going left and going right. This is to allow our hero to move while shooting
    const [previousKeys, setPreviousKeys] = useState([])
    const [firing, setFiring] = useState(false)
    const [timeOfLastFire , setTimeOfLastFire] = useState(Date.now())

    //handling position changing scenarios in a function

    const moveAround = (key) => {
        
        if (key === "ArrowLeft") {
            if (storePosition.x >= 2) {
                setPreviousKeys([])
                 dispatch({type: 'borat/putXPosition', payload: parseInt(storePosition.x)-5}
                 
                )}
        } else if (key === "ArrowRight" ) {
            if (storePosition.x <=92) {
                setPreviousKeys([])
                dispatch({type: 'borat/putXPosition', payload: parseInt(storePosition.x)+5}
                )}
            }
            if (key === " " && (Date.now() - timeOfLastFire) > 200) {
                dispatch({ type: 'projectile/spawn', payload: parseInt(storePosition.x)})
                setFiring(false);
                setTimeOfLastFire(Date.now())
            }
        }

        

    //Returning the Borat Saucer  
    return <div tabIndex = '0' className = "fancy-square" style = {{top:storePosition.y + "vh", left: storePosition.x + "vh"}} onKeyDown = { e => {
            e.preventDefault();
            moveAround(e.key);

                
                           
            
    }} onKeyUp = { e => {
        e.preventDefault();
            if (e.key === " ") {
                    setFiring(false); 
                }       
        
    }}
 ref={inputRef}></div>
}
export default MovingItem
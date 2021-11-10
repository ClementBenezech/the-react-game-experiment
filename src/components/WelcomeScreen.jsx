import { useDispatch } from 'react-redux'
import '../styles/welcomeScreen.scss'
import boratImage from '../images/borat.png'
import gwbushImage from '../images/gwbush.png'
import vsImage from '../images/vs.png'

const WelcomeScreen = (props) => {
    const dispatch = useDispatch()
    return <div className = "welcome-screen">
        <img  className = "welcome-screen__logo" src = {boratImage}/>
        <img  className = "welcome-screen__logo" src = {vsImage}/>
        <img  className = "welcome-screen__logo" src = {gwbushImage}/>
        <span className = "welcome-screen__text">Earth is under attack! A swarm of space Georges W. Bushes is trying to take over our planet! You are Borat and you were given a spaceship equiped with space rockets, made in Kazakhstan of course, the greatest nation in the world</span>
        <span className = "welcome-screen__text">To move, use keyboard arrows <button className = "welcome-screen__button-demo">{'<'}</button> and <button className = "welcome-screen__button-demo">{'>'}</button></span>
        <span className = "welcome-screen__text">To shoot, use the <button className = "welcome-screen__button-demo">{'SPACE'}</button> key!</span>
        <span className = "welcome-screen__text">If you can save us all, it's nice. I liiiiiike!</span>
        <button name="button" className = "welcome-screen__button-start" onClick = {(e) => {
            dispatch({ type: 'gameStarted/setValue', payload: true})
        }}>SAVE THE EARTH!</button>
    </div>
}

export default WelcomeScreen
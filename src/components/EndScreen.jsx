import { useSelector } from 'react-redux'
import '../styles/welcomeScreen.scss'
import boratImage from '../images/borat-nice.png'
import youLoseImage from '../images/youlose.png'


const EndScreen = (props) => {

    const storeLifeCount = state => state.lifeCount;
    const lifeCount = useSelector(storeLifeCount);

    // If we still have lives left, we display the victory message
    if (lifeCount > 0) {
        return <div className = "welcome-screen">
            <img  className = "welcome-screen__logo welcome-screen__logo--big" src = {boratImage}/>
            <span className = "welcome-screen__text">WOW Dude. You saved the earth. Now humans can kill each other in peace and harmony</span>

        </div>
    }
    //If we have no lives, we display the defeat message
    else {
        return <div className = "welcome-screen">
            <img  className = "welcome-screen__logo welcome-screen__logo--big" src = {youLoseImage}/>
            <span className = "welcome-screen__text">WOW Dude. You suck. Everyone's dead now. Children and everything. Also, it's your fault</span>
        </div>
    }
}

export default EndScreen
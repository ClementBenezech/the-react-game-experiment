import { useDispatch, useSelector } from 'react-redux'
import '../styles/welcomeScreen.scss'
import boratImage from '../images/borat-nice.png'
import youLoseImage from '../images/youlose.png'
import { initialState } from './Constants'


const EndScreen = (props) => {
    const dispatch = useDispatch()

    const storeLifeCount = state => state.lifeCount;
    const lifeCount = useSelector(storeLifeCount);

    if (lifeCount > 0) {
        return <div className = "welcome-screen">
            <img  className = "welcome-screen__logo welcome-screen__logo--big" src = {boratImage}/>
            <span className = "welcome-screen__text">WOW Dude. You saved the earth. Now humans can kill each other in peace and harmony</span>

        </div>
    }
    else {
        return <div className = "welcome-screen">
            <img  className = "welcome-screen__logo welcome-screen__logo--big" src = {youLoseImage}/>
            <span className = "welcome-screen__text">WOW Dude. You suck. Everyone's dead now. Children and everything. Also, it's your fault</span>
        </div>
    }
}

export default EndScreen
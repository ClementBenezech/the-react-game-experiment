import '../styles/lifeCounter.scss'
import { useSelector } from "react-redux"

const LifeCounter = () => {

        //Setting Hook on life counter
        const lifeCount = state => state.lifeCount;
        const storeLifeCount = useSelector(lifeCount)

    
    if (storeLifeCount > 0) {
        return <div className = "life-counter">
            <i class="fas fa-heart life-counter__icon"></i>
            <div className = "life-counter__value">{storeLifeCount}</div>
        </div>
    } else {
        return <div className = "life-counter">Game Over Man!</div>
    }
}
export default LifeCounter
import '../styles/lifeCounter.scss'
import { useSelector } from "react-redux"

const KillCounter = () => {

        //Setting Hook on life counter
        const killCount = state => state.killCount;
        const storeKillCount = useSelector(killCount)

    
    if (storeKillCount < 10) {
        return <div className = "life-counter">
            <i class="fas fa-skull"></i>
            <div className = "life-counter__value">{storeKillCount}</div>
        </div>
    } else {
        return <div className = "life-counter">They are all dead!</div>
    }
}
export default KillCounter
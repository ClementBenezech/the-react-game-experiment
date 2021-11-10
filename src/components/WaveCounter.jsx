import '../styles/lifeCounter.scss'
import { useSelector } from "react-redux"

const WaveCounter = () => {

        //Setting Hook on life counter
        const waveCount = state => state.waveCount;
        const storeWaveCount = useSelector(waveCount)

    
    if (storeWaveCount < 10) {
        return <div className = "life-counter">
            <i class="fas fa-skull life-counter__icon"></i>
            <div className = "life-counter__value">{storeWaveCount}</div>
        </div>
    } else {
        return <div className = "life-counter">They are all dead!</div>
    }
}
export default WaveCounter
import MovingItem from './MovingItem';
import Enemy from './Enemy';
import { useSelector, useDispatch } from 'react-redux';
import Projectile from './Projectile';


const GameGrid = () => {

    const storeWaveNumber = state => state.waveCount;
    const waveNumber = useSelector(storeWaveNumber)

    const storeEnemies = state => state.enemies;
    const enemies = useSelector(storeEnemies)

    const storeProjectiles = state => state.projectiles;
    const projectiles = useSelector(storeProjectiles)

    const reactElementArrayEnemies = enemies[waveNumber].map(enemy => {
    return <Enemy id = {enemy.id}/>
    })

    console.log(projectiles)

    let reactElementArrayProjectiles = [];

    if (projectiles.length > 0) {
        reactElementArrayProjectiles = projectiles.map(projectile => {
            if (projectile.dead === false) {
            return <Projectile id = {projectile.id}/>
            }
          })

    }    

    return(
          <div className = "grid" >
            <MovingItem/>
                {reactElementArrayEnemies}
                {reactElementArrayProjectiles}
          </div>

      )
}
export default GameGrid
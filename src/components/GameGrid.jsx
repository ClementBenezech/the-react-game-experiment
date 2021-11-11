import MovingItem from './MovingItem';
import Enemy from './Enemy';
import { useSelector } from 'react-redux';
import Projectile from './Projectile';



const GameGrid = () => {

    /*Declaring hooks*/

    const storeWaveNumber = state => state.waveCount;
    const waveNumber = useSelector(storeWaveNumber)

    const storeEnemies = state => state.enemies;
    const enemies = useSelector(storeEnemies)

    const storeProjectiles = state => state.projectiles;
    const projectiles = useSelector(storeProjectiles)

    
    //Getting enemies from current wave for rendering
    const reactElementArrayEnemies = enemies[waveNumber].map(enemy => {
    return <Enemy id = {enemy.id}/>
    })

    let reactElementArrayProjectiles = [];
    //Checking if there are projectiles in the state
    if (projectiles.length > 0) {
        //For each projectile...
        reactElementArrayProjectiles = projectiles.map(projectile => {
            //If the projectile in not dead, or has been dead less than 1000ms
            if (Date.now() - projectile.timeOfDeath < 1000 || projectile.timeOfDeath === null) {
                //We return the projectile for rendering.
                return <Projectile id = {projectile.id}/>
            }
          })
    }    

    // Rendering the grid with the player, enemies from current wave and projectiles.
    return(
          <div className = "grid" >
            <MovingItem/>
                {reactElementArrayEnemies}
                {reactElementArrayProjectiles}
          </div>

      )
}
export default GameGrid
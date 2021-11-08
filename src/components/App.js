import React from 'react';
import '../styles/App.css';
import '../styles/base.scss';
import MovingItem from './MovingItem';
import Enemy from './Enemy';
import LifeCounter from './LifeCounter';
import { useSelector } from 'react-redux';
import Projectile from './Projectile';
import KillCounter from './KillCounter';

function App() {

  const storeEnemies = state => state.enemies;
  const enemies = useSelector(storeEnemies)

  const storeProjectiles = state => state.projectiles;
  const projectiles = useSelector(storeProjectiles)

  const storeEnemy = state => state.enemy;
  const enemy = useSelector(storeEnemy)

  const reactElementArrayEnemies = enemies.map(enemy => {
    return <Enemy id = {enemy.id}/>
  })

  const reactElementArrayProjectiles = projectiles.map(projectile => {
    return <Projectile id = {projectile.id}/>
  })

  return(    
    
    <div className = "grid" >
      <MovingItem/>

          {reactElementArrayEnemies}
          {reactElementArrayProjectiles}

      <div className = "counters">
        <LifeCounter/>
        <KillCounter/>
      </div>
    </div>
  )
}

export default App;

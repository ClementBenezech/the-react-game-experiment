import React, { useState } from 'react';
import '../styles/App.css';
import '../styles/base.scss';
import { useSelector, useDispatch } from 'react-redux';
import WelcomeScreen from './WelcomeScreen';
import GameGrid from './GameGrid';
import LifeCounter from './LifeCounter';
import KillCounter from './KillCounter';
import WaveCounter from './WaveCounter';
import EndScreen from './EndScreen';

function App() {

        const storeGameStarted = state => state.gameStarted;
        const gameStarted = useSelector(storeGameStarted)

        const storeKillCount = state => state.killCount;
        const killCount = useSelector(storeKillCount)

        const storeLifeCount = state => state.lifeCount;
        const lifeCount = useSelector(storeLifeCount)

        const storeWaveCount = state => state.waveCount;
        const waveCount = useSelector(storeWaveCount)

        const storeEnemyCount = state => state.enemies[waveCount].length;
        const enemyCount = useSelector(storeEnemyCount)

        const storeNbOfWaves = state => state.enemies.length;
        const nbOfWaves = useSelector(storeNbOfWaves)

        const dispatch = useDispatch()

        if (gameStarted === true) {
          if (killCount === enemyCount) {
            /*dispatch({ type: 'gameStarted/setValue', payload: false})*/
            if (waveCount != (nbOfWaves - 1)) {
            dispatch({ type: 'wave/add', payload: 1 })  
            dispatch({ type: 'killCount/add', payload: -10})
            }
          }

          if (waveCount != nbOfWaves -1 && lifeCount > 0 ) {
          return(
            <div className = "screen">
              <div className = "counters">
              <LifeCounter/>
              <KillCounter/>
              <WaveCounter/>
            </div>
            <GameGrid/>
            </div>
          )
          } else {
            return(
              <div className= "screen">
                <EndScreen/>
              </div>
            )
          }
        }
        else {
          return(
            <div className= "screen">
              <WelcomeScreen/>
            </div>
          )
        }
}

export default App;

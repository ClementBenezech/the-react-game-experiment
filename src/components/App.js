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

        //Declaring all necessary hooks. 

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

        //if the game has started
        if (gameStarted === true) {
          //If all enemies from this wave are dead
          if (killCount === enemyCount) {
            //If this is not the last of the waves
            if (waveCount != (nbOfWaves - 1)) {
            // We dispatch the next wave and reset the killcount.
              dispatch({ type: 'wave/add', payload: 1 })  
              dispatch({ type: 'killCount/add', payload: -10})
            }
          }

          //if the player still have lives and we have not reached the last wave.
          if (waveCount != nbOfWaves -1 && lifeCount > 0 ) {
          //We return the gameScreen
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
            //In any other scenarion display the endScreen:
            // We know the game has started, so whenever we have no lives or reach last wave, its over.
            return(
              <div className= "screen">
                <EndScreen/>
              </div>
            )
          }
        }
        //If the game has not started yet, we display the welcome screen.
        else {
          return(
            <div className= "screen">
              <WelcomeScreen/>
            </div>
          )
        }
}

export default App;

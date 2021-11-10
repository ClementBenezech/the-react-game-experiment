import update from 'immutability-helper';
import { createReducer } from '@reduxjs/toolkit';
import produce from 'immer';
import { enemyWaves } from './Constants';
import { initialState } from './Constants';

   // Use the initialState as a default value
   export default function AppReducer(state = initialState, action) {
     // The reducer normally looks at the action type field to decide what happens  
     switch (action.type) {  
         case 'borat/putXPosition' : {
           return {
                ...state,
                    boratPosition: {'x':action.payload, 'y': state.boratPosition.y}
            }
        }
        case 'borat/putYPosition' : {
          return {
               ...state,
                   boratPosition: {'x':state.boratPosition.x, 'y': action.payload}
           }
       }
       case 'lifeCount/decrease' : {
        return {
             ...state,
                 lifeCount: state.lifeCount -1
         }
     }
     case 'killCount/add' : {
        return {
             ...state,
                 killCount: state.killCount + action.payload
         }
     }
     case 'enemy/descend' : {
        return produce(state, draft => {
            // Modify the draft however you want
            draft.enemies[action.payload.waveNumber][action.payload.id].y = action.payload.position;
        })   
    }
    case 'projectile/elevate' : {
        return produce(state, draft => {
            // Modify the draft however you want
            draft.projectiles[action.payload.id].y = action.payload.position;
        })   
    }
    case 'projectile/spawn' : {
        return produce(state, draft => {
            // Modify the draft however you want
            console.log(draft.projectiles.length)
            draft.projectiles.push({'id': draft.projectiles.length, 'x' : action.payload.toString(), 'y' : "90", 'dead' : false })
        })
    }
    case 'enemy/setDead' : {
        return produce(state, draft => {
            // Modify the draft however you want
            draft.enemies[action.payload.waveNumber][action.payload.id].dead = action.payload.dead;
        })   
    }
    case 'projectile/setDead' : {
        return produce(state, draft => {
            // Modify the draft however you want
            draft.projectiles[action.payload.id].dead = action.payload.dead;
        })   
    }
    case 'projectile/remove' : {
        return produce(state, draft => {
            // Modify the draft however you want
            draft.projectiles = draft.projectiles.splice(action.payload, 1);

        })   
    }
    case 'gameStarted/setValue' : {
        return produce(state, draft => {
            // Modify the draft however you want
            draft.gameStarted = action.payload

        })   
    }
    case 'wave/add' : {
        return produce(state, draft => {
            // Modify the draft however you want
            draft.waveCount = draft.waveCount + action.payload

        })   
    }

       default:      
       // If this reducer doesn't recognize the action type, or doesn't      
       // care about this specific action, return the existing state unchanged 
       return state 
   }}
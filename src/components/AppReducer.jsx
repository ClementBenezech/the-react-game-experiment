import produce from 'immer';
import { initialState } from '../js/Constants';


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
                draft.enemies[action.payload.waveNumber][action.payload.id].y = action.payload.position;
            })   
        }
        case 'projectile/elevate' : {
            return produce(state, draft => {
                draft.projectiles[action.payload.id].y = action.payload.positionY;
            })   
        }
        
        case 'projectile/spawn' : {
            return produce(state, draft => {
                console.log(draft.projectiles.length)
                draft.projectiles.push({'id': draft.projectiles.length, 'x' : action.payload.positionX.toString(), 'y' : action.payload.positionY.toString() , 'dead' : false, 'type' : action.payload.type, timeOfDeath: null })
            })
        }
        case 'enemy/setDead' : {
            return produce(state, draft => {
                draft.enemies[action.payload.waveNumber][action.payload.id].dead = action.payload.dead;
            })   
        }
        case 'enemy/decreaseHealth' : {
            return produce(state, draft => {
                draft.enemies[action.payload.waveNumber][action.payload.id].enemyType.health = draft.enemies[action.payload.waveNumber][action.payload.id].enemyType.health - action.payload.amount;
            })   
        }
        case 'projectile/setDead' : {
            return produce(state, draft => {
                draft.projectiles[action.payload.id].dead = action.payload.dead;
            })   
        }
        case 'projectile/setTimeOfDeath' : {
            return produce(state, draft => {
                draft.projectiles[action.payload.id].timeOfDeath = action.payload.timeOfDeath

            })   
        }
        case 'gameStarted/setValue' : {
            return produce(state, draft => {
                draft.gameStarted = action.payload

            })   
        }
        case 'wave/add' : {
            return produce(state, draft => {
                draft.waveCount = draft.waveCount + action.payload

            })   
        }

       default:      
       // If this reducer doesn't recognize the action type, or doesn't      
       // care about this specific action, return the existing state unchanged 
       return state 
   }}
import update from 'immutability-helper';
import { createReducer } from '@reduxjs/toolkit';
import produce from 'immer';



const initialState = {
    boratPosition: {'x':'50', 'y':'90'},
    GWBushPosition: {'x':'50', 'y':'50'},
    enemies : [{'id': 0, 'x': '5', 'y':'10', "dead": false},
                {'id': 1,'x': '25', 'y':'10', "dead": false},
                {'id': 2, 'x': '45', 'y':'10', "dead": false},
                {'id': 3,'x': '65', 'y':'10', "dead": false},
                {'id': 4,'x': '85', 'y':'10', "dead": false},
                {'id': 5, 'x': '5', 'y':'20', "dead": false},
                {'id': 6,'x': '25', 'y':'20', "dead": false},
                {'id': 7, 'x': '45', 'y':'20', "dead": false},
                {'id': 8,'x': '65', 'y':'20', "dead": false},
                {'id': 9,'x': '85', 'y':'20', "dead": false}],
    projectiles :[],
    lifeCount: 10,
    killCount: 0
}
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
     case 'killCount/increase' : {
        return {
             ...state,
                 killCount: state.killCount +1
         }
     }
     case 'enemy/descend' : {
        return produce(state, draft => {
            // Modify the draft however you want
            draft.enemies[action.payload.id].y = action.payload.position;
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
            draft.enemies[action.payload.id].dead = action.payload.dead;
            draft.enemies[action.payload.id].x = "0"
            draft.enemies[action.payload.id].y = "0"
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
            /*draft.projectiles.splice(action.payload, 1)*/

        })   
    }

       default:      
       // If this reducer doesn't recognize the action type, or doesn't      
       // care about this specific action, return the existing state unchanged 
       return state 
   }}
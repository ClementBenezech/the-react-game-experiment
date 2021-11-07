const initialState = {
    boratPosition: {'x':'50', 'y':'90'},
    GWBushPosition: {'x':'50', 'y':'50'},
    lifeCount: 10
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
       default:      
       // If this reducer doesn't recognize the action type, or doesn't      
       // care about this specific action, return the existing state unchanged 
       return state 
   }}
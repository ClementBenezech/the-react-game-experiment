//This exports a single function taking enemyType (string) as a parameter and returning an enemyTypeObject
//Thils will be used to define the prorperties of each enemy in constants.js

export const enemyPrototypes = (enemyType) => {
    switch (enemyType) {
        /*Standard enemy. Just descends slowly*/
        case 'regular':
            return (
                {   'size': 5,
                    'speed': 1,
                    'health': 1, 
                    'className': "regular",
                    'attacksFromADistance': false
                }
            )
            case 'fast':
            /*As strong, but twice as fast */
            return (
                {   'size': 5,
                    'speed': 2,
                    'health': 1, 
                    'className': "fast",
                    'attacksFromADistance': false
                }
            )
            case 'heavy':
            //Normal speed, triple health//
            return (
                {   'size': 5,
                    'speed': 1,
                    'health': 3, 
                    'className': "heavy",
                    'attacksFromADistance': false
                }
            )
            case 'shooter':
            //Can shoot projectiles!
            return (
                {   'size': 5,
                    'speed': 1,
                    'health': 1, 
                    'className': "shooter",
                    'attacksFromADistance': true
                }
            )
        }
    }
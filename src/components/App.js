import React from 'react';
import '../styles/App.css';
import '../styles/base.scss';
import MovingItem from './MovingItem';
import FixedItem from './FixedItem';
import LifeCounter from './LifeCounter';

function App() {
  /*const gridContent = () => {
    const items = [];
    for (let i = 0; i <= 1; i++) { 
             items.push(<MovingItem xPosition = {i} yPosition = {i}/>)
    }
    return items
  }*/
  return(    
    
    <div className = "grid" >
      <MovingItem/>
      <FixedItem xPosition = {30} yPosition = {10}/>
      <FixedItem xPosition = {50} yPosition = {10}/>
      <FixedItem xPosition = {70} yPosition = {10}/>
      <LifeCounter/>
    </div>
  )
}

export default App;

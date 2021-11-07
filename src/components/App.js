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
      <FixedItem xPosition = {5} yPosition = {10}/>
      <FixedItem xPosition = {25} yPosition = {10}/>
      <FixedItem xPosition = {45} yPosition = {10}/>
      <FixedItem xPosition = {65} yPosition = {10}/>
      <FixedItem xPosition = {85} yPosition = {10}/>

      <FixedItem xPosition = {5} yPosition = {20}/>
      <FixedItem xPosition = {25} yPosition = {20}/>
      <FixedItem xPosition = {45} yPosition = {20}/>
      <FixedItem xPosition = {65} yPosition = {20}/>
      <FixedItem xPosition = {85} yPosition = {20}/>
      <LifeCounter/>
    </div>
  )
}

export default App;

import React from 'react'
import {  
  GAME_STATE_PLAYING, } 
  from "../constants";
import { render } from 'react-dom';
const Footer = ({onNewGameClick,onSuggestClick, gameState}) => {

  const renderButtons = () => {
    if(gameState === GAME_STATE_PLAYING)
    {
      return  <button className='footer-button' onClick={onSuggestClick}>SUGGEST</button>;
    }
    return <button className='footer-button' onClick={onNewGameClick}>New Game</button>;
  }
  return (
    <div className='panel footer'>
    {
     renderButtons()
    }
    </div>
  )
}

export default Footer;

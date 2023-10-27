import React, { useState } from "react";
import GameCircle from "./GameCircle";
import '../Game.css';
import Header from "./Header";
import Footer from "./Footer";
import { isDraw, isWinner,getComputerMove } from "../helper";
import {  
        GAME_STATE_PLAYING, 
        GAME_STATE_WIN,
        NO_PLAYER,
        PLAYER_1,
        PLAYER_2,
        No_Circles,  
        GAME_STATE_DRAW} 
        from "../constants";
import { useEffect } from "react";


const GameBoard = () => {

    const [gameBoard, setGameBoard] = useState(Array(No_Circles).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState , setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer , setWinPlayer] = useState(NO_PLAYER);
    console.log(gameBoard);

    useEffect(() => {
        initGame();
    },[]);

    //for initializing the game
    const initGame = () => {
        console.log('Init game');
        setGameBoard(Array(No_Circles).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);

    }


    //initialising the board
     const initBoard = () =>{
        const circles = [];
        for(let i = 0 ; i < No_Circles ; i++)
        circles.push(renderCircle(i));
        return circles;
     }

     //AI player
     const suggestMove = () => {
        circleclicked(getComputerMove(gameBoard));
     }

     //event listener for circle clicked
    const circleclicked = (id) => {

        console.log("circle clicked : " +id)
        if(gameBoard[id] !== NO_PLAYER)
        {
            return;
        }
        if(gameState !== GAME_STATE_PLAYING)
        {
            return;
        }
        if(isWinner(gameBoard,id,currentPlayer))
        {
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        }

        if(isDraw(gameBoard,id,currentPlayer))
        {
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
        }

        //names the current player
        setGameBoard(prev =>{
            return prev.map((circle,pos) =>{
                if(pos === id)
                return currentPlayer;
            else
            return circle;
            })
        })

        
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2:PLAYER_1);
        console.log(gameBoard);
        console.log(currentPlayer);
    }


    const renderCircle = id =>{
        return <GameCircle key = {id} id = {id}  className = {`player_${gameBoard[id]}`} oncircleclicked = {circleclicked}/>
    }

    
    return( 
    <>
        <Header gameState = {gameState} currentPlayer = {currentPlayer} winPlayer = {winPlayer}/>
            <div className = "gameBoard" >
            {initBoard()}
            </div>
        <Footer onNewGameClick = {initGame} onSuggestClick={suggestMove}  gameState={gameState}/>
    </>
    )
}

export default GameBoard;
import React from "react";
import '../Game.css';

const GameCircle = ({id,children,className,oncircleclicked}) =>{
    
    return (
    <div className = {`gameCircle ${className}`} onClick={(ev) =>oncircleclicked(id)}>
        {children}
    </div>
    )
}
export default GameCircle   
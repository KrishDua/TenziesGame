import React from 'react'

function Die(props) {
    const styles = {
        backgroundColor : props.isHeld ? "#59E391" : "white"
    }   
  return (
    <button 
    onClick={()=> props.hold(props.id)}
    style = {styles}
    aria-label={`Die with value ${props.value}, 
     ${props.isHeld ? "held" : "not held"}`}
    aria-pressed={props.isHeld}
    >
    {props.value}
    </button>
  )
}

export default Die 
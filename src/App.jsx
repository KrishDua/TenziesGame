import { useState,useRef,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Die from './Components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
function App() {
  const  [dice,setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);

  function generateAllNewDice(){
   return new Array(10).fill(0).map(()=> (
    {
    value : Math.ceil(Math.random()*6), 
    isHeld : false,
    id : nanoid()
  }
  )); 
  }
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value);
  function rollDice(){
    if(gameWon){
      setDice(generateAllNewDice());
    }else{
      setDice(oldDice => oldDice.map(die =>{
        return die.isHeld ? die : {...die,value : Math.ceil(Math.random()*6)};
      }))
    }
  }
  useEffect(() => {
    if(gameWon){
      buttonRef.current.focus();
    }
  }
  , [gameWon]);
  function hold(id){
    setDice(oldDice => oldDice.map(die=>{
      return die.id === id ? {...die,isHeld : !die.isHeld} : die
    }))
  }
  const diceElements = dice.map((dieobj, index) => {
      return <Die key={dieobj.id} hold={hold} {...dieobj} />
  })
  return (
    <main>
      {
        gameWon && <Confetti />
      }
      <div aria-live='polite'>
        {gameWon ? 
          <>    
            <h1 className="title">Congratulations!</h1>
            <h2 className='head'> You won!</h2>
            <p className="instructions">Press "New Game" to start again.</p>          
          </> :
          <>
              <h1 className="title">Krish's Tenzies</h1>
              <p className="instructions">Roll until all dice are the same. <br />
              Click each die to freeze it <br /> at its current value between rolls.</p>
          </>
        }
      </div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button ref={buttonRef} className='roll-dice' onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App

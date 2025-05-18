import { useState,useRef,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Die from './Components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
function App() {
  const  [dice,setDice] = useState(() => generateAllNewDice());
  const [rollCount,setRollCount] = useState(0);
  const [time,setTime] = useState(0);
  const [isRunning,setIsRunning] = useState(false);
  const timerRef = useRef(null);
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
      setRollCount(0);
      setTime(0);
      setIsRunning(false);
    }else{
      if(!isRunning){
        setIsRunning(true);
      }
      setRollCount(prev => prev + 1)
      setDice(oldDice => oldDice.map(die =>{
        return die.isHeld ? die : {...die,value : Math.ceil(Math.random()*6)};
      }))
    }
  }
  useEffect(() => {
    if(gameWon){
      buttonRef.current.focus();
      setIsRunning(false);
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
  useEffect(()=>{
   if(isRunning){
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
   }else{
    clearInterval(timerRef.current);
   } 
   return () => {
    clearInterval(timerRef.current);
   }
  },[isRunning])
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
        <div className="instructions">
        <p><strong>Rolls:</strong> {rollCount}</p>
        <p><strong>Time:</strong> {time} seconds</p>
        </div>
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

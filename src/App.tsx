import { useState } from 'react'
import './App.css'

function App() {
  const [number, setNumber] = useState<{ value: number; isPrime?: boolean }>({
    value: 0,
  })
  const [previousSearch, setPreviousSearch] = useState<
    { value: number; isPrime: boolean }[]
  >([])

  const handleKeyPress = (e: { keyCode: number; which: number }) => {
    if (e.keyCode === 13 || e.which === 13) {
      checkPrimeHandle()
    }
  }

  const checkPrimeHandle = () => {
    if (number.value <= 2) {
      return alert(`This Number cannot be used to define a Prime number`)
    }

    if (previousSearch.find((element) => element.value === number.value)) {
      return alert(
        'You have already inserted this number, please check the history log'
      )
    }

    for (let i = 2; i < number.value; i++) {
      if (number.value % i == 0) {
        setPreviousSearch((prev) => [
          ...prev,
          { value: number.value, isPrime: false },
        ])
        return
      }

      setPreviousSearch((prev) => [
        ...prev,
        { value: number.value, isPrime: true },
      ])
      return
    }
  }

  return (
    <>
      <h1>Insert a Number</h1>
      {previousSearch.length > 0 ? (
        <h2>
          {previousSearch[previousSearch.length - 1].value}{' '}
          {previousSearch[previousSearch.length - 1].isPrime == true
            ? `is Prime`
            : `is not Prime`}{' '}
        </h2>
      ) : null}
      <div className="card">
        <input
          className="numberInput"
          onKeyDown={handleKeyPress}
          onChange={(e) => setNumber({ value: Number(e.target.value) })}
        />
        <button onClick={checkPrimeHandle}>Send</button>
      </div>

      <div className="results">
        {previousSearch.length > 0 ? (
          <div className="history">
            <h2> Previously searched numbers </h2>
            {previousSearch.map((number, i) => {
              return (
                <h3 key={i}>
                  {number.value} ({number.isPrime ? `is Prime` : `is not Prime`}
                  )
                </h3>
              )
            })}
          </div>
        ) : null}
      </div>
    </>
  )
}

export default App

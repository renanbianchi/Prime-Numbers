import { useState } from 'react'
import './App.css'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

import { ErrorMessage } from './components/ErrorMessage'

function App() {
  const [number, setNumber] = useState<{ value: number; isPrime?: boolean }>({
    value: 0,
  })

  const [previousSearch, setPreviousSearch] = useState<
    { value: number; isPrime: boolean }[]
  >([])

  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleKeyPress = (e: { keyCode: number; which: number }) => {
    if (e.keyCode === 13 || e.which === 13) {
      isDisabled ? null : checkPrimeHandle()
    }
  }

  const checkData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[^\d,]/g, ''))

    if (value <= 2) {
      setErrorMessage('You cannot use values lower than 2')
      return setIsDisabled(true)
    }

    if (previousSearch.find((element) => element.value === value)) {
      setErrorMessage('Number already registered in history')
      return setIsDisabled(true)
    }

    setNumber({ value: value })
    setErrorMessage('')
    setIsDisabled(false)
  }

  const checkPrimeHandle = () => {
    let isPrime = true
    for (let i = 2; i < number.value; i++) {
      if (number.value % i == 0) {
        isPrime = false
      }

      setPreviousSearch((prev) => [
        ...prev,
        { value: number.value, isPrime: isPrime },
      ])
      setIsDisabled(true)
      return
    }
  }

  return (
    <>
      <h1>Insert a Number</h1>
      <h2 className="result">
        {previousSearch.length > 0
          ? `${previousSearch[previousSearch.length - 1].value}${' '}
          ${
            previousSearch[previousSearch.length - 1].isPrime == true
              ? `is Prime`
              : `is not Prime`
          }
            `
          : null}
      </h2>
      <div className="card">
        <input
          type="text"
          maxLength={10}
          className="numberInput"
          onKeyDown={handleKeyPress}
          onChange={(e) => checkData(e)}
        />
        {isDisabled ? <ErrorMessage message={errorMessage} /> : null}
        <button disabled={isDisabled} onClick={checkPrimeHandle}>
          Send
        </button>
      </div>

      <div className="results">
        {previousSearch.length > 0 ? (
          <div className="history">
            <h2> Previously searched numbers </h2>
            <div className="historyList">
              {previousSearch.map((number, i) => {
                return (
                  <div className="item" key={i}>
                    <h2>{number.value}</h2>{' '}
                    {number.isPrime ? (
                      <AiOutlineCheckCircle fill="green" size={20} />
                    ) : (
                      <AiOutlineCloseCircle fill="red" size={20} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default App

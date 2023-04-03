
import { useEffect, useState } from 'react';
import Header from './components/Header';
import './App.css';
import Input from './components/Input';
import Select from './components/Select';
import { getRates } from "./utils/getRates";
import { format } from "./utils/formatt"
import { calc } from './utils/calulate';
import { clearInputs } from './utils/clearInputs';
import Button from "./components/Button"


function App() {
  const [selectRates, setSelectRates] = useState({ fromRates: "USD", toRates: "UAH" })
  const [inputsValue, setInputsValue] = useState({ fromAmount: "", toAmount: "" })
  const [currencies, setCurrencies] = useState([])
  const [load, setLoad] = useState(true)

  const fetchCurrencies = async () => {
    try {
      const responce = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      const data = await responce.json()
      const filteredData = data.filter(item => ["EUR", "GBP", "USD"].includes(item.cc))
      setCurrencies([
        ...filteredData,
        { "rate": 1, "cc": "UAH" }
      ])
    } catch (error) { console.log(error) }

    setLoad(false)
  }
  const handleInputsChange = (inputValue, rate1, rate2, name) => {
    const fromRate = getRates(currencies, rate1)
    const toRate = getRates(currencies, rate2)

    const checkInput = name === "inputOne"

    const fromAmount = checkInput ? inputValue : format(calc(inputValue, fromRate, toRate));
    const toAmount = checkInput ? format(calc(inputValue, fromRate, toRate)) : inputValue;

    setInputsValue({ ...inputsValue, fromAmount, toAmount, });

  };
  const handleSelectsChange = (value, name) => {
    name === "selectOne"
      ? setSelectRates({ ...selectRates, fromRates: value })
      : setSelectRates({ ...selectRates, toRates: value });
  }
  const changeCurrenciesBySelect = (inputValue, rate1, rate2) => {
    const fromRate = getRates(currencies, rate1);
    const toRate = getRates(currencies, rate2);

    const checkInput = inputValue === inputsValue.fromAmount;

    const toAmount = checkInput ? format(calc(inputValue, fromRate, toRate)) : inputValue;
    const fromAmount = checkInput ? inputValue : format(calc(inputValue, toRate, fromRate));

    setInputsValue({ ...inputsValue, toAmount, fromAmount, });
  };

  useEffect(() => {
    fetchCurrencies()
  }, [])

  useEffect(() => {
    if (load) return
    changeCurrenciesBySelect(
      inputsValue.fromAmount,
      selectRates.fromRates,
      selectRates.toRates,
    )
  }, [selectRates.fromRates])

  useEffect(() => {
    if (load) return
    changeCurrenciesBySelect(
      inputsValue.toAmount,
      selectRates.fromRates,
      selectRates.toRates,
    )

  }, [selectRates.toRates])






  return (
    <div className="App">
      <Header
        load={load}
        currencies={currencies}>
      </Header>
      <div className='group'>
        <Select
          name="selectOne"
          currencies={currencies}
          onChange={(e) => {
            handleSelectsChange(
              e.target.value,
              e.target.name,
            )
          }}
          disableOption={selectRates.toRates}
          value={selectRates.fromRates}
        >
        </Select>
        <Input
          name="inputOne"
          type="number"
          placeholder={"From"}
          value={inputsValue.fromAmount}
          onChange={(e) => {
            handleInputsChange
              (e.target.value,
                selectRates.fromRates,
                selectRates.toRates,
                e.target.name)
          }}
        >
        </Input>
        <Button
          onClick={() => clearInputs("fromAmount", inputsValue, setInputsValue)}>
        </Button>
      </div>

      <div className='group'>
        <Select
          name="selectTwo"
          currencies={currencies}
          onChange={(e) => {
            handleSelectsChange(
              e.target.value,
              e.target.name,
            )
          }}
          disableOption={selectRates.fromRates}
          value={selectRates.toRates}>
        </Select>
        <Input
          name="inputTwo"
          type="number"
          placeholder={"To"}
          value={inputsValue.toAmount}
          onChange={(e) => {
            handleInputsChange(
              e.target.value,
              selectRates.toRates,
              selectRates.fromRates,
              e.target.name)
          }}
        >
        </Input>
        <Button
          onClick={() => clearInputs("toAmount", inputsValue, setInputsValue)}>
        </Button>
      </div>
    </div >
  )
};


export default App;

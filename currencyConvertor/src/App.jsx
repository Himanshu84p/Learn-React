import { useEffect, useState } from "react";
import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox.jsx"

function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");

  const currencyInfo = useCurrencyInfo(from);
 
  const options = Object.keys(currencyInfo);


  const swap = () => {
    setTo(from);
    setFrom(to);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
      setConvertedAmount(amount * currencyInfo[to]);
  };

  useEffect(() => {
    convert()
    
  },[amount,to,from])
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGN1cnJlbmN5fGVufDB8fDB8fHww')`,
        objectFit : "contain",
        width : "100%"
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
               label="From" 
               onAmountChange = {(amt) => {setAmount(parseFloat(amt))}}
               onCurrencyChange = {(curr) => {setFrom(curr)}}
               currencyOptions = {options}
               amount = {isNaN(amount) ? 0 : amount}
               selectedCurrency={from}

              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
            <InputBox
               label="To" 
               onAmountChange = {(amt) => {setConvertedAmount(parseFloat(amt))}}
               onCurrencyChange = {(curr) => {setTo(curr)}}
               currencyOptions = {options}
               amount={isNaN(convertedAmount) ? 0 : convertedAmount}
               selectedCurrency={to}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              onClick={convert}
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

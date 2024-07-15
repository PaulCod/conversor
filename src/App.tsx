import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [real, setReal] = useState(0);
  const [btcAmount, setBtcAmount] = useState(0);
  const [ethAmount, setEthAmount] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,BRL&api_key=11334bb3e2530e28622a049b0dd525445ba6db48e156e86a5fa3d9fe6736d0fc")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error != null || data === null) {
    return <h1>Error: {error.message}</h1>;
  }

  const handleRealChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value < 0 || isNaN(value)) {
      setBtcAmount(0);
      setEthAmount(0);
      return;
    }
    setReal(value);
    if (data) {
      setBtcAmount(value / data.BTC.BRL);
      setEthAmount(value / data.ETH.BRL);
    }
  };
  

  return (
    <section className="main-content">
      <div className="card">
        <h1>Conversor de real para crypto</h1>

        <div className="crypto-prices">
          <p>BTC: {data.BTC.BRL} BRL</p>
          <p>ETH: {data.ETH.BRL} BRL</p>
        </div>
        
        <div className="amountInput">
          <input
            type="number"
            name="real"
            id="real"
            placeholder="Digite o valor em reais"
            onChange={handleRealChange}
            prefix="R$"
          />
          <p>Você pode comprar {btcAmount.toFixed(6)} BTC</p>
          <p>Você pode comprar {ethAmount.toFixed(6)} ETH</p>
        </div>
      </div>
    </section>
  );
}

export default App;

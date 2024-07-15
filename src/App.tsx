import { useEffect, useState } from "react";
import "./App.css";

interface CryptoData {
  BTC: { BRL: number };
  ETH: { BRL: number };
}

function App() {
  const [data, setData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [real, setReal] = useState<number>(0);
  const [btcAmount, setBtcAmount] = useState<number>(0);
  const [ethAmount, setEthAmount] = useState<number>(0);

  console.log(real)

  useEffect(() => {
    setLoading(true);
    fetch("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,BRL&api_key=11334bb3e2530e28622a049b0dd525445ba6db48e156e86a5fa3d9fe6736d0fc")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: CryptoData) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (!data) {
    return <h1>Data not found</h1>;
  }

  const handleRealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setReal(value);
    if (!isNaN(value)) {
      setBtcAmount(value / data.BTC.BRL);
      setEthAmount(value / data.ETH.BRL);
    } else {
      setBtcAmount(0);
      setEthAmount(0);
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
          />
          <p>Você pode comprar {btcAmount.toFixed(6)} BTC</p>
          <p>Você pode comprar {ethAmount.toFixed(6)} ETH</p>
        </div>
      </div>
    </section>
  );
}

export default App;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Price = (props) => {

    let dollarsFormat = Intl.NumberFormat('en-US')

  const apiKey = "7628EABB-3E46-413A-8994-0365FEBE363E";
  // Grabbing the Currency symbol from the URL Params
  const params = useParams();
  //   console.log(useParams())
  const symbol = params.symbol;
  // Using the other two variables to create our URL
  const url = `http://rest-sandbox.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  //state to hold the coin data
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    getCoin();
  }, []);

  const getCoin = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCoin(data);
    } catch (e) {
      console.error(e);
    }
  };

  

  const loaded = () => {
    return (
      <div>
        <h1>
          {coin.asset_id_base}/{coin.asset_id_quote}
        </h1>
        <h2>${dollarsFormat.format(coin.rate.toFixed(2))}</h2>

      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  

  return (
    <div>
      <h1>Price Page</h1>
      {coin && coin.rate ? loaded(): loading()}
    </div>
  );
};

export default Price;

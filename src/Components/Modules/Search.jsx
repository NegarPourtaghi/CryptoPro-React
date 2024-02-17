import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { MarketChart, SearchCoin } from '../../Services/CryptoApi';
import styles from '../Modules/Search.module.css'
import { RotatingLines } from 'react-loader-spinner';

const SearchBox = ({Currency, setCurrency, setChart}) => {
    const [Search , setSearch]=useState("");
    const [Coins ,setCoins] =useState([]);
    const [Loading ,setLoading]=useState(false)

    useEffect(()=>{
        const controller=new AbortController();
        setCoins([])
        if(!Search) {setLoading(false) ; return;};
        setLoading(true)
        axios.get(SearchCoin(Search),{signal:controller.signal})
        .then(res => {setCoins(res.data.coins)
        setLoading(false) 
        }
        )
        .catch(err => {
            if(err.name !== "AbortError"){
                alert(err.message)
            }
        })

        return ()=> controller.abort();
    },[Search]);
    
    return (
        <div className={styles.Container}>
            <input type='text' value={Search}  placeholder='Search Coin' onChange={e => setSearch(e.target.value)} />
            <select value={Currency} onChange={e=> setCurrency(e.target.value)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>

            </select>
          {
            Search.length>0 && (  <div className={styles.SearchResult}>
                {Loading && <RotatingLines width='50px' height="50px" strokeWidth='2' strokeColor='#3874ff' />}
                <ul>
                   {
                    Coins.map(item => <SearchedCoin Coin={item} key={item.id} setChart={setChart} />)
                   }
                </ul>
            </div>)
          }
        </div>
    );
};

export default SearchBox;


const SearchedCoin=({setChart,Coin})=>{

        const {id,thumb,name}=Coin;

        const ClickHandler=()=>{

            axios.get(MarketChart(id))
            .then(res =>{ setChart({...res.data , Coin})
                 console.log(Coin)})
            .catch(err => console.log(err))
        }
    return(
        <li key={id} onClick={ClickHandler}>
            <img src={thumb} alt={name} />
            <p>{name}</p>
        </li>
    )
}
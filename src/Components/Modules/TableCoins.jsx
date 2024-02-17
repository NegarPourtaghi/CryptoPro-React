import ChartDown from '../../assets/chart-down.svg'
import ChartUp from '../../assets/chart-up.svg'
import { RotatingLines } from 'react-loader-spinner';
import styles from './TableCoins.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MarketChart } from '../../Services/CryptoApi';
const TableCoins = ({Coins,Loading,Currency,setChart}) => {
    const [Sign , setSign]=useState("")
    
 useEffect(()=>{
    const CurrensyTab=()=>{
        if(Currency==="usd"){
           return setSign("$")
        }else if(Currency==="eur"){
            setSign("€")
        }else{
            setSign("¥")
        }
       }
       CurrensyTab()
 },[Currency])
    return (
        <div className={styles.Container}>
       {
        Loading 
        ?<RotatingLines strokeColor='#3874ff' strokeWidth='2'/>
        :( <table className={styles.Table}>
            <thead>
                <tr>
                    <th>Coin</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>24th</th>
                    <th>Total Volume</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { Coins.map((Coin) =><TableRow key={Coin.id} Coin={Coin} Sign={Sign} setChart={setChart} />)  }

            </tbody>
        </table>)
       }
    </div>
    );
};

export default TableCoins;



const TableRow=({setChart,Coin,Sign}) =>{
    const {id,image, name, symbol, current_price, total_volume, price_change_percentage_24h:price_change}=Coin;
    const ModalHandler=()=>{
        axios.get(MarketChart(id))
        .then(res=>{setChart({...res.data,Coin})
    console.log(Coin)})
        .catch(err => setChart(null))
    }
return(
    <>
    <tr>
    <td>
        <div className={styles.Symbol} onClick={ModalHandler}>
            <img src={image} alt={name}/>
            <span>{symbol.toUpperCase()}</span>
        </div>
    </td>
    <td>{name}</td>
    <td>{Sign}{current_price.toLocaleString()}</td>
    <td className={price_change>0 ? styles.Success : styles.Error}>{price_change.toFixed(2)} %</td>
    <td>{total_volume.toLocaleString()}</td>
    <td>
        <img src={price_change>0 ? ChartUp : ChartDown} />
    </td>

</tr>
    </>
)
}

import React, { useState } from 'react';
import styles from './Modal.module.css'
import { ConvertData } from '../../Helpers/Function';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const Chart = ({Chart , setChart}) => {
    const [Type, setType]=useState("prices");
    const ClickHandler=(e)=>{
        if(e.target.tagName === "BUTTON"){
            const type=e.target.innerText.toLowerCase().replace(" " , "_");
            setType(type)
        }

    }
    return (
        <div className={styles.Container }>
            <span className={styles.Cross} onClick={()=>{setChart(null)}}>X</span>

            <div className={styles.MyChart}>
                <div className={styles.Names}>
                    <img src={Chart.Coin.image} alt={Chart.Coin.name} />
                    <p>{Chart.Coin.name}</p>
                </div>
                <div className={styles.Graph}>
                   <ChartComponent data={ConvertData(Chart ,Type)} type={Type} />
                </div>
                <div className={styles.Types} onClick={ClickHandler}>
                    <button className={Type === "prices" ? styles.Selected :null} >Prices</button>
                    <button className={Type === "market_caps" ? styles.Selected :null} >Market caps</button>
                    <button className={Type === "total_volumes" ? styles.Selected :null} >Total volumes</button>
                </div>
                <div className={styles.Details}>
                    <div>
                        <p>Prices: </p>
                        <span>${Chart.Coin.current_price}</span>
                    </div>
                    <div>
                        <p>ATH: </p>
                        <span>${Chart.Coin.ath}</span>
                    </div>
                    <div>
                        <p>market cap: </p>
                        <span>${Chart.Coin.market_cap}</span>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Chart;


const ChartComponent=({data, type})=>{
    return( <ResponsiveContainer width="100%" height="100%">
    <LineChart width={400} height={400} data={data} >
        <Line type="monotone" dataKey={type} stroke='#3874ff' strokeWidth="2px" />
        <CartesianGrid stroke='#404042'/>
        <YAxis dataKey={type} domain={["auto","auto"]} /> 
        <XAxis dataKey="Date" hide/>
        <Legend />
        <Tooltip />
    </LineChart>
    </ResponsiveContainer>)
}
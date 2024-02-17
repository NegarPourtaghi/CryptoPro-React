import axios from "axios";
import { useEffect, useState } from "react";
import TableCoins from '../Modules/TableCoins'
import { GetCoins } from "../../Services/CryptoApi";
import Pagination from "../Modules/Pagination";
import Search from "../Modules/Search";
import Modal from "../Modules/Modal";
const HomePage = () => {
    const [Coins , setCoins]=useState([])
    const [Loading ,setLoading]=useState(true)
    const [Page, setPage]=useState(1);
    const [Currency ,setCurrency]=useState("usd");
    const[Chart, setChart]=useState(null);
    
    useEffect(()=>{
        setLoading(true);
        axios.get(GetCoins(Page ,Currency))
        .then(res=> setCoins(res.data),setLoading(false))
        .catch(err =>{
            if(err){
                alert(err.message)
            }
        })


    }, [Page,Currency])
    return (
        <div>
            <Search Currency={Currency} setCurrency={setCurrency} setChart={setChart} />
              <TableCoins Coins={Coins} Loading={Loading} Currency={Currency} setChart={setChart} />
              <Pagination Page={Page} setPage={setPage}/>
            {!!Chart && <Modal Chart={Chart} setChart={setChart} />}


        </div>
    );
};

export default HomePage;
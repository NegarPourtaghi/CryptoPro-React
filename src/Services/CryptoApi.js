
const BASE_URL="https://api.coingecko.com/api/v3";
const API_KEY="CG-2gNEzLYHAqcguVCw4fzyBUXU";


const GetCoins=(Page ,Currency)=>{
    return `${BASE_URL}/coins/markets?vs_currency=${Currency}&order=market_cap_desc&per_page=20&page=${Page}&sparkline=false&locale=en&x_cg_demo_api_key=${API_KEY}`
    
}
const SearchCoin=(query) => {
    return `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`

}
const MarketChart=(coin)=>{
    return `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`
}
export {GetCoins , SearchCoin, MarketChart}
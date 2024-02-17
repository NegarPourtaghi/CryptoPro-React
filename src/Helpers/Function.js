const ConvertData=(Data , type)=>{
    const ConvertedData=Data[type].map(item =>{
        return{
            Date:item[0],
            [type]:item[1],
        }
    })
    return ConvertedData;
}

export {ConvertData}
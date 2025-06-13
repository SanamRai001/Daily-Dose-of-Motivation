import { useState } from "react";
function Newimage(){
    const getImageURL = ()=> `http://localhost:3000/quote-images?t=${Date.now()}`;
    const [url, setUrl] = useState(getImageURL());
    const [loader, setLoader]  = useState(true);
    const handleimage = ()=>{
        setLoader(true);
        setUrl(getImageURL());
    };

    const handleLoad = ()=>setLoader(false);
    return (<>
        <div>
            <div style={{width:"800px", height:"350px"}}>

                {loader &&
                (
                <img src="/loader.gif" alt="Loading screeen" style={{width:"100%", height:"100%"}} />   
                )}
                <img src={url} alt="qoute" onClick={handleimage} onLoad={handleLoad} title="Click on image to generate new one " style={{cursor: 'pointer', display : loader ? "none" : "block",width:"100%", height:"100%"}} />
                
            </div>
            <button onClick={handleimage}>New Image</button>
        </div>
    </>);
}

export default Newimage
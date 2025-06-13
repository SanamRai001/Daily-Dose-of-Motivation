function Download(){

    
    return(<>
    <div>
        <a href={`http://localhost:3000/quote-images?download=true&t=${Date.now()}`} download="quote.png" className="download"><button>Download Image</button></a>
    </div>
    </>);
}

export default Download
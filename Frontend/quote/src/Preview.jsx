function Preview(){
    return(
        <>
            <img src={`http://localhost:3000/quote-images?download=false&t=${Date.now()}`} alt="Motivation of the dat" />
        </>
    );
}

export default Preview
import { useState , useEffect} from "react"
import "./Meme.css"

export default function Meme(){
    
    // Meme on display
    const [meme,setMeme] = useState({
        topText: "",
        bottomText: "",
        imgUrl: "/img/placeholder.png"
    });

    // Getting top 100 memes
    const [allMemes,setAllMemes] = useState([]);

    useEffect( ()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(memeSet =>  setAllMemes(memeSet.data.memes));
        
       
    },[])

    //Random image from the 100 image
    function getRandomImage(){
        const randomNumber = Math.floor(Math.random() * 100);
        const url = allMemes[randomNumber].url
        setMeme( prevMeme => ({
            ...prevMeme,
            imgUrl: url
        }));
    }

    // Continously change the text
    function handleChange(event){
        const {name,value} = event.target;
        setMeme(  prevMeme=>({
            ...prevMeme,
            [name] : value
        }));
    }

    return(
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getRandomImage}
                >
                    Get a new image
                </button>
            </div>
            <div className="meme">
                <img src={meme.imgUrl} className="meme--img" alt="meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )


}
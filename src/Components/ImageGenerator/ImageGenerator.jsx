import React, { useRef, useState, useEffect  } from 'react'
import "./ImageGenerator.css"
import def_image from "../Assets/default_image.svg"
import { useNavigate } from 'react-router-dom';

const ImageGenerator = () => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const navigate = useNavigate();
    const [image_url, setImage_url] = useState("/")
    const [loading, setloading] = useState(false)
    let inputRef = useRef(null)

    useEffect(() => {
        if (!localStorage.getItem('userEmail')) {
            navigate('/');  // Redirect to login if not authenticated
        }
    }, [navigate]);

    const ImageGeneratorFunc = async () => {
        if (inputRef.current.value === "") {
            return 0
        }
        setloading(true)
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                    "User-Agent": "Chrome"
                },
                body:JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n:1,
                    size: "512x512"
                }),

            }
        );

        let data = await response.json();
        let dataArray = data.data
        setImage_url(dataArray[0].url)
        setloading(false)
    }

    const handleLogout = () => {
        // Clear user session or token here (localStorage, sessionStorage, etc.)
        localStorage.removeItem('userEmail'); // Example: If you're storing email/token
        navigate('/'); // Redirect back to login page
    };

    return (
        <div className='ai_image_generator'>
        <div className='header'>AI Image <span>Generator</span></div>
        <div className='img_loading'>
            <div className='image'>
                <img src={image_url === '/' ? def_image : image_url} alt='default'/>
                <div className='loading'>
                    <div className={loading ? "loading_bar_full" : "loading_bar"}></div>
                    <div className={loading ? "loading_text" : "display_none"}>Loading.....</div>
                </div>
            </div>
            </div>
            <div className='search_box2'>
                <input type='text' ref={inputRef} placeholder='Describe the image here..' className='search_input'></input>
                <div className="generate_btn" onClick={() => {ImageGeneratorFunc()}}>Generate</div>
            </div>
            <button className="generate_btn" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default ImageGenerator

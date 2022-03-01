import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";

function ImgContainer(props){
    const [imageData, setImageData] = useState('');
    const fetchUrl = 'http://localhost:3001/'+props.imageRef; 
    
    useEffect(() =>{
        fetch(fetchUrl)
            .then(response => response.blob())
            .then(image => {
                // Create a local URL of that image
                const localUrl = URL.createObjectURL(image);
                setImageData(localUrl);
            });
    }, []);

    if (props.imageRef == null) {

        return(
            <Fragment>
            </Fragment>
        )
    } else {
        return(
            <Fragment>
               <img src={imageData}/>
            </Fragment>
         )
    }
    }
  

export default ImgContainer


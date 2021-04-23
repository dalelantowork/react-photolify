import React, { useEffect, useState } from 'react'
import Heading from './components/Heading'
import Loader from './components/Loader'
import UnsplashImage from './components/UnsplashImage'
import './App.css';
import Axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'
import styled from 'styled-components'
import {createGlobalStyle} from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'

//Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    font-family: sans-serif;
  }
`;

const WrapperImage = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
  grid-auto-rows: 300px;

`;

function App() {
  const [images,setImages] = useState([])
  
  
  const getImages = () => {
    const accessKey = process.env.REACT_APP_ACCESSKEY
    const apiRoot = "https://api.unsplash.com/"
    
    Axios.get(`${apiRoot}photos/random?client_id=${accessKey}&count=30`)
    .then((res)=>{
      //console.log(res);
      setImages([...images, ...res.data]);
    })
  }

  useEffect(()=> {
    fetchImages()
  },[])

  const fetchImages = () => {
    getImages()
  }

  if(!images){
    return <h1>Loading...</h1>
  }
  return (
    <div className="App">
      <Heading />
      <GlobalStyle />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />} 
      >
        <WrapperImage>
          {images.map(image => (
            <UnsplashImage url={image.urls.regular} key={image.id} />
          ))}
        </WrapperImage>
      </InfiniteScroll>
      
      {/* {images.map((image) => {
        return (
          <LazyLoadImage
            effect="blur"
            src={image.urls.regular}
            alt={image.alt_description}
            key={image.id}
            height="500px"
            width="400px"
            //placeholderSrc={waterdrop}
          />  
        )
      })} */}
      
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react'
import TextBox from './components/TextBox'
import Arrows from './components/Arrows'
import Button from './components/Button'
import Modal from './components/Modal'
import axios from 'axios'

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [languages, setLanguages] = useState(null)
  const [inputLanguage, setInputLanguage] = useState('English')
  const [outputLanguage, setOutputLanguage] = useState('Polish')
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')


  const getLanguages = async () => {

  const options = {
    method: 'GET',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
    headers: {
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': 'c0a2d3b7a8mshe348abd873a4e4ep17385djsn44c42053c9a5',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    const arrayOfData = Object.keys(response.data.data).map(key => response.data.data[key])
      setLanguages(arrayOfData)
  }).catch(function (error) {
    console.error(error);
  });}








const translate = async () => {
  

  const encodedParams = new URLSearchParams();
  encodedParams.append("q", "Hello, world!");
  encodedParams.append("target", "es");
  encodedParams.append("source", "en");
  
  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': 'c0a2d3b7a8mshe348abd873a4e4ep17385djsn44c42053c9a5',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: encodedParams
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    setTranslatedText(response.data)
  }).catch(function (error) {
    console.error(error);
  });
}

  

useEffect(()=>{
  getLanguages()
},[])
  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
  }


  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            style="input"
            setShowModal={setShowModal}
            selectedLanguage={inputLanguage}
            setTextToTranslate={setTextToTranslate}
            textToTranslate={textToTranslate}
            setTranslatedText={setTranslatedText}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>
          <TextBox
            style="output"
            setShowModal={setShowModal}
            selectedLanguage={outputLanguage}
            translatedText={translatedText}
          />
          <div className="button-container" onClick={translate}>
            <Button />
          </div>
        </>
      )}
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={
            showModal === 'input' ? inputLanguage : outputLanguage
          }
          setChosenLanguage={
            showModal === 'input' ? setInputLanguage : setOutputLanguage
          }
        />
      )}
    </div>
  )
}

export default App


import { Container, Switch, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { createMuiTheme,TextField, ThemeProvider } from "@material-ui/core";
import { useState, useEffect } from "react";
import "./App.css";
import { debounce } from "lodash";
import axios from "axios";


function App() {
  const too=[0,1,2,3,4,5,6,7,8,9]
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [LightTheme, setLightTheme] = useState(false);
  const [message, setMessage] = useState('');
  const [def1, setDef1] = useState('')
  
  const [ug, setUg] = useState('');


  const translate = () => {
    const encodedParams = new URLSearchParams();
encodedParams.append("from", "en");
encodedParams.append("to", "mn");
encodedParams.append("text", "hello");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'c0a2d3b7a8mshe348abd873a4e4ep17385djsn44c42053c9a5',
		'X-RapidAPI-Host': 'translo.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://translo.p.rapidapi.com/api/v3/translate', options)
	.then(response => response.json())
	.then(response => setMessage(response.translated_text))
	.catch(err => console.error(err));

}

  
  const dictionaryApi = async () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c0a2d3b7a8mshe348abd873a4e4ep17385djsn44c42053c9a5',
        'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
      }
    };
    
    fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`, options)
      .then(response => response.json())
      .then(response => setDef1(response.list))
      .catch(err => console.error(err));
  };
  

  

  useEffect(() => {
    {word && dictionaryApi();}
  }, [word]);
  def1.map(x => {console.log(x.definition)})
// console.log(def1)






 
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: LightTheme ? "#000" : "#fff",
      },
      type: LightTheme ? "light" : "dark",
    },
  });
    const handleText = debounce((text) => {
    setWord(text);
  }, 500);
  





  const PurpleSwitch = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);
  
 
 

  

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: LightTheme ? "#fff" : "#282c34",
        color: LightTheme ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
     
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{LightTheme ? "Dark" : "Light"} Mode</span>
          <PurpleSwitch
            checked={LightTheme}
            onChange={() => setLightTheme(!LightTheme)}
          />
        </div>
        <div className="header" setWord={setWord}
          word={word}
          setMeanings={setMeanings}
          LightTheme={LightTheme}>
      <span className="title">{word ? word : "Word Hunt"}</span>
      <div className="inputs">
      <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            id="filled-basic"
            // value={word}
            label="Search a Word"
            onChange={(e) => handleText(e.target.value)}
          
          />
       
        </ThemeProvider>
      </div>
    </div>
    <div className="meanings" meanings={meanings}
            word={word}
            LightTheme={LightTheme}
           >
    <button onClick={translate}>click</button>

    {word === "" ? (
        <span className="subTitle">Start by typing a word in search</span>
      ) : ( 
      // def1.map(x => {
          <div
            className="singleMean"
            style={{
              backgroundColor: LightTheme ? "#3b5360" : "white",
              color: LightTheme ? "white" : "black",
            }}
          >
            <b>123</b>
            <hr style={{ backgroundColor: "black", width: "100%" }} />
            
              <span>
                <b>Example :</b> 
              </span>
            
          
          </div>
        
      
      )}
    </div>
    </div>
  );
}


export default App;


// https://rapidapi.com/armangokka/api/translo
// https://rapidapi.com/zakutynsky/api/YandexTranslate/
// https://translate.yandex.com/?source_lang=en&target_lang=mn&text=Hypertext%20Transfer%20Protocol%20Secure%20(https)%20is%20a%20combination%20of%20the%20Hypertext%20Transfer%20Protocol%20(HTTP)%20with%20the%20Secure%20Socket%20Layer%20(SSL)%2FTransport%20Layer%20Security%20(TLS)%20protocol.%20TLS%20is%20an%20authentication%20and%20security%20protocol%20widely%20implemented%20in%20browsers%20and%20Web%20servers
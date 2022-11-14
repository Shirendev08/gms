import { Container, Switch, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { createMuiTheme,TextField, ThemeProvider } from "@material-ui/core";
import { useState, useEffect } from "react";
import "./App.css";
import { debounce } from "lodash";
import axios from "axios";


function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [LightTheme, setLightTheme] = useState(false);
  const [message, setMessage] = useState('');
  
  const [ug, setUg] = useState('');


  const translate = () => {
  

  const encodedParams = new URLSearchParams();
encodedParams.append("q", message);
encodedParams.append("target", "mn");
encodedParams.append("source", "en");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': 'b823934181mshc65114803b831f8p1d84d5jsn8a7cfc272ad9',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
	.then(response => response.json())
	.then(async (response) => { setUg(response.data.translations[0].translatedText)})
	.catch(err => console.error(err));
    

}

  
  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );setMessage(data.data[0].meanings[0].definitions[0].definition)
      
    } catch (error) {
      console.log(error);
    }
  };
  

  

  useEffect(() => {
    {word && dictionaryApi();}
  }, [word]);





 
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
          <TextField>
          
          </TextField>
        </ThemeProvider>
      </div>
    </div>
    <div className="meanings" meanings={meanings}
            word={word}
            LightTheme={LightTheme}
           >
    {/* <button onClick={translate}>click</button> */}

    {word === "" ? (
        <span className="subTitle">Start by typing a word in search</span>
      ) : (
        // meanings.map((mean) =>
        //   mean.meanings.map((item) =>
        //     item.definitions.map((def) => (
        //       <div
        //         className="singleMean"
        //         style={{
        //           backgroundColor: LightTheme ? "#3b5360" : "white",
        //           color: LightTheme ? "white" : "black",
        //         }}
        //       >
        //         <b>  <ul> {def.definition}  </ul></b> <ul><p>{ug}</p></ul>
        //         <hr style={{ backgroundColor: "black", width: "100%" }} />
        //         {def.example && (
        //           <span>
        //             <ul> <b>Example :</b> {def.example}</ul>
        //           </span>
        //         )}
               
        //       </div>

            
          <div
                className="singleMean"
                style={{
                  backgroundColor: LightTheme ? "#3b5360" : "white",
                  color: LightTheme ? "white" : "black",
                }}
              >
                <b>  <ul> {message}  </ul></b> <ul><p>{ug}</p></ul>
                <hr style={{ backgroundColor: "black", width: "100%" }} />
                
                  <span>
                    <ul> <b>Example :</b> {message}</ul>
                  </span>
              </div>
        
      )}
               
              
      
    </div>
    </div>
  );
}

export default App;

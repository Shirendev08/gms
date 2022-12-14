import { Container, Switch, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { createMuiTheme,TextField, ThemeProvider } from "@material-ui/core";
import { useState, useEffect } from "react";
import "./App.css";
import { debounce } from "lodash";
import axios from "axios";
import logo from './mandakh.jpg'


function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [LightTheme, setLightTheme] = useState(false);
  const [message, setMessage] = useState('');
  const [def1, setDef1] = useState([])
  const [defs, setDefs] = useState()
  const [ug, setUg] = useState('');


  const translate = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("from", "en");
    encodedParams.append("to", "mn");
    encodedParams.append("text", def1.list[0].definition);

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'f1f842cab2msh0946c87ea15c3a2p17ebe0jsn645c7b089abc',
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
    
    await fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`, options)
      .then(response => response.json())
      .then(response => setDef1(response))
      .catch(err => console.error(err));
  };
  // console.log(def1.list)




  // def1 && console.log(def1.list)
  // def1 && [def1.list].map((x)=>{
  //   console.log(x.author)
  // })

  // const a=[0,1,2,3,4,5,6,7,8,9]
  const defLoop = () => {

    return(
      def1.list.map((x) => (
        <div  key={x.definition}
        className="singleMean"
        style={{
          backgroundColor: LightTheme ? "#555555" : "white",
          color: LightTheme ? "white" : "black",
        }}
        >
            <p setDefs={setDefs}>
              {x.definition}
              {/* {console.log(defs)} */}
              </p>
            {/* {defLoop()} */}
                  {/* {def1 && <b>{word}</b>} */}
                  {/* <b>{def1}</b>  */}
            <hr style={{ backgroundColor: "black", width: "100%" }} />
            
              <span>
                {message} 
              </span>
            
          
          </div>
      ))
    )
    // // console.log("a")
    // def1.list.map(x => {
    //   return(
    //     <b>{x.definition}</b>
    //   )
    // })
    
    // for(let i = 0; i<10; i++){
    //   return (<b>{def1.list[i].definition}</b>)

    // }
  }
  useEffect(()=> {

  //   {def1 && setDefs(a.map((x) => (
  //     <b>{def1.list[x].definition}</b>
  // )))}
    
    // if (typeof def1 !== "undefined"){
    //   setDefs(def1.list.map((x) => 
    //     <b>{x.definition}</b>
    //   ))
    // }
    // else{
    //   console.log("else", def1.list)


    
    
      
    
    // {def1 && <b>aaa</b>}

    // if(typeof def1 != undefined){
      // for(let i = 1; i<=10; i++){
      //   console.log(def1.list[i])
      // console.log("a")
      // }
    // }
    // console.log(def1)
    
  },[def1])

  

  useEffect(() => {
    {word && dictionaryApi();}
  },[word]);
  useEffect(() => {
    {word && def1 && translate();}
  },[def1]);


//   def1.map(x => {console.log(x.definition)})
// const a=Object.keys(def1.list)
// const DisplayData=def1 && a.map((x)=>{
//   return (
//    <div>
//      <h5>{def1.list[x].definition}</h5>
//      <br/>
//    </div>
//   )
// });
// console.log(a)

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
        color: LightTheme ? "#444444" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <img style={{width: "20%", marginTop:"15px", marginLeft: "20px"}} src={logo}/>
     
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
      <span className="title">{word ? word : "Hello"}</span>
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
    {/* <button onClick={translate}>???????????? ???????????????????????? ??????????</button> */}

    {word === "" ? (
        <span className="subTitle">Start by typing a word in search</span>
      ) : ( 
       
          // <div
          //   className="singleMean"
          //   style={{
          //     backgroundColor: LightTheme ? "#555555" : "white",
          //     color: LightTheme ? "white" : "black",
          //   }}
          // >
          //   {def1.length != 0 ? defLoop() : console.log("null")}
          //   {/* {defLoop()} */}
          //         {/* {def1 && <b>{word}</b>} */}
          //         {/* <b>{def1}</b>  */}
          //   {/* <hr style={{ backgroundColor: "black", width: "100%" }} /> */}
            
          //     <span>
          //       {/* {message} */}
          //     </span>
          
          // </div>
          def1.length !== 0 ? defLoop() : console.log("null")
          
        
      
      )}
    </div>
    </div>
  );
}


export default App;


// https://rapidapi.com/armangokka/api/translo
// https://rapidapi.com/zakutynsky/api/YandexTranslate/
// https://translate.yandex.com/?source_lang=en&target_lang=mn&text=Hypertext%20Transfer%20Protocol%20Secure%20(https)%20is%20a%20combination%20of%20the%20Hypertext%20Transfer%20Protocol%20(HTTP)%20with%20the%20Secure%20Socket%20Layer%20(SSL)%2FTransport%20Layer%20Security%20(TLS)%20protocol.%20TLS%20is%20an%20authentication%20and%20security%20protocol%20widely%20implemented%20in%20browsers%20and%20Web%20servers
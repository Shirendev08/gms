import {useState} from 'react';

const App = () => {
  const [message, setMessage] = useState('');
  const [meaning, setMeaning] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };

  const translate = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", message);
    encodedParams.append("target", "mn");
    encodedParams.append("source", "en");
    
    const translateApiOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': 'e1b75410aemsh25be6f5e579bb8ap15bdacjsn098f8f344007',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      body: encodedParams
    };
    
    return fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', translateApiOptions)
      .then(response => response.json())
      .then(response => setMeaning(response.data.translations[0].translatedText))
      .catch(err => console.error(err));

  }
  console.log()

  return (
    <div>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
      />

      <h2 onClick={translate}>Message:{meaning} </h2>
    </div>
  );
};

export default App;
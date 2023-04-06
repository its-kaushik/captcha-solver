import { useState } from 'react';

const App = () => {

  const [imageUrl, setImageUrl] = useState("");
  const [captchaResult, setCaptchaResult] = useState("");

  const handleUrlChange = (e) => {

    setImageUrl(e.target.value);

  }

  const onSubmit = (e) => {

    e.preventDefault();

    let data = {
      url: imageUrl
    }

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }

    let fetchRes = fetch(
      "http://localhost:8000/api/captcha",
      options
    );

    fetchRes
      .then(res =>
        res.json()
      )
      .then(data =>
        setCaptchaResult(data.result)
      )
      .catch(error =>
        console.log(error)
      )

  }

  return (
    <div className="App">
      <h1>The Captcha Solver !!</h1>
      <form onSubmit={onSubmit} >
        <label htmlFor='image-url'>Image URL :</label>
        <input type='text' id='image-url' name='image-url' onChange={handleUrlChange} />
        <input type='submit' />
      </form>

      {
        captchaResult.length > 0 &&
        <p>
          Result : {captchaResult}
        </p>
      }

    </div>
  );
}

export default App;

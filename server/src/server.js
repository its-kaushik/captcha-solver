const path = require('path');
const cors = require('cors');

const express = require('express');
const axios = require('axios');

require('dotenv').config();
const app = express();

const config = {
    PORT: process.env.PORT,
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    RAPID_API_HOST: process.env.RAPID_API_HOST
}

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/api/captcha', (req, res) => {

    const captchaUrl = req.body.url;

    console.log(`URL is : ${captchaUrl}`);

    const options = {
        method: 'POST',
        url: 'https://image-captcha-solver.p.rapidapi.com/recognizeUrl',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': config.RAPID_API_KEY,
            'X-RapidAPI-Host': config.RAPID_API_HOST
        },
        data: { "url": captchaUrl }
    };

    axios.request(options)
        .then(
            (response) => {

                console.log(response.data);

                if (response.data.status === 'success') {

                    res.status(200).json({
                        "status": "success",
                        "result": response.data.result
                    });

                } else {
                    res.status(500).json({
                        "status": "fail",
                    });
                }
            }
        )
        .catch(
            (error) => {
                console.error(error);
                res.status(500).json({
                    "status": "fail"
                })
            }
        )

});

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'), (err) => {
        if (err) {
            console.log(`Couldn't Send File.. Error : ${err}`);
            res.status(500).json({
                "msg": "Couldn't load the files. Please try again.."
            });
        }
    });
});

app.listen(config.PORT, () => {
    console.log(`Successfully listening to Port : ${config.PORT}`);
});
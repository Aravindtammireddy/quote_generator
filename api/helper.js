const request = require('request'); 
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);


  exports.weatherfinder =   (phonenumber,latitude,longitude,callback,callback1,callback2) => {
    const API_KEY = process.env.API_KEY;
   var url = `http://api.openweathermap.org/data/2.5/weather?`
            +`lat=${latitude}&lon=${longitude}&appid=${API_KEY}` ;
            request({ url: url, json: true }, function (error, response) { 
              if (error) { 
                  console.log('Unable to connect to Forecast API'); 
              } 
              console.log("weather : " , response.body.weather[0].main)
             return callback(phonenumber,response.body.weather[0].main,callback1,callback2);
            } )  
        }
        
    exports.messagesender =  (phonenumber,image,quote) =>{
        var options = {
            method: 'POST',
            url: 'https://api.ultramsg.com/instance45441/messages/image',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            form: {
              token: 'gm28nxf7dj5dgbr1',
              to: phonenumber,
              image: image,
              caption: quote,
              referenceId: ''
            }
        }
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(body);
              });
    }
    // exports.quotegenerator = (phonenumber,weather,callback,callback1) => {
    //         const options = {
    //         method: 'POST',
    //         url: 'https://v1.genr.ai/api/circuit-element/prompt-to-text',
    //         headers: {'Content-Type': 'application/json'},
    //         body: {
    //           prompt: `write a quote on todays weather ${weather}`,
    //           max_tokens: 1000
    //         },
    //         json: true
    //       };
          
    //       request(options, function (error, response, body) {
    //         if (error) throw new Error(error);
    //         let quote = `life is a little rough sometimes like the current weather`;
    //         console.log("quote : " , body);
    //        return  callback(phonenumber,quote,callback1);
    //         return quote;
    //       })
    //     }

    exports.quotegenerator = async  (phonenumber,weather,callback,callback1) => {
         
            const messages = [{role: "user", content:`generate a quote on the weather ${weather}`}];
            try {
              const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: messages,
              });
        
              const completion_text = completion.data.choices[0].message.content;
              console.log("quote", completion_text);
              await callback(phonenumber,completion_text,callback1);
            } catch (error) {
              if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
              } else {
                console.log(error.message);
              }
            }
              
          
          }
    

   exports.imagegenerator =  async (phonenumber,quote,callback) => {
    try {
      const response = await openai.createImage({
        prompt: quote,
        n: 1,
        size: "512x512",
      });
      console.log(response.data.data[0].url);
      return callback(phonenumber,response.data.data[0].url,quote);
    } catch (err) {
      console.log(err.message);
      return (err.message);
    }
        }
          
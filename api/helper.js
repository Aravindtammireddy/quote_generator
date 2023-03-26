const request = require('request'); 

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
            url: 'https://api.ultramsg.com/instance33065/messages/image',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            form: {
              token: 'WARNING7ff33Fddet4dd',
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
    exports.quotegenerator = (phonenumber,weather,callback,callback1) => {
            const options = {
            method: 'POST',
            url: 'https://v1.genr.ai/api/circuit-element/prompt-to-text',
            headers: {'Content-Type': 'application/json'},
            body: {
              prompt: `write a quote on todays weather ${weather}`,
              max_tokens: 1000
            },
            json: true
          };
          
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
            let quote = `life is a little rough sometimes like the current weather`;
            console.log("quote : " , body);
           return  callback(phonenumber,quote,callback1);
            return quote;
          })
        }

   exports.imagegenerator =  (phonenumber,quote,callback) => {
            const options = {
              method: 'POST',
              url: 'https://v1.genr.ai/api/circuit-element/generate-image',
              headers: {'Content-Type': 'application/json'},
              body: {
                prompt: quote,
                height: 512,
                width: 512,
                model: 'stable-diffusion-2',
                n_images: 1
              },
              json: true
            };
            
            request(options, function (error, response, body) {
              if (error) throw new Error(error);
            
              console.log(body);
              let q = {"quote" : quote , "image" : body.output}
              return callback(phonenumber,body.output,quote);
              return q;
            })
        }
          
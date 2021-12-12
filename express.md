<p align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Expressjs.png/220px-Expressjs.png"></p>

# About Express JS

- Middleware 
```  
Those methods which are called between processing the Request and sending the Response in your application.
```  

- next() 
```  
It is the callback argument to the middleware function
```  

- express.json() 
```  
It is a inbuilt method that helps to recognize the incoming Request as a JSON.
```   
- express.urlencoded() 
```  
It is a inbuilt method that helps to recognize the incoming Request as a string or array.
```  

- dotenv.config() 
```  
this method will read your .env file , parse the content and assign it to the process.env. After that through process.env we will get the key-value pair of .env file
```  

- config 
```  
it makes easier to manage environment specific configuration values
```  

- express.static() 
```
it serves the static file
```
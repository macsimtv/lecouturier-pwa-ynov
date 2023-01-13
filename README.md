# Todo - Lecouturier pwa 

Application created with Ynov


## Deployment

To deploy this project you will need to change the url of your api in `/front/src/boot/axios.js`

```js
  const api = axios.create({ baseUrl: "URL OF YOUR API" });
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (server folder)

`MONGO_URI`

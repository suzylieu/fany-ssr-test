import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from 'react-router-config';
import { Provider } from "react-redux";
import routes from './client/routes';
import store from './client/redux';
import ReturnPage from './client/pages/ReturnPage'

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded())

app.get("*", (req, res) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  );

  const html = `
     <html>
       <head>
       <title>飢餓三十聚樂邦報名</title>
       </head>
       <body>
         <div id="root">${content}</div>
         <script src="bundle.js"></script>
       </body>
     </html>
   `;

  res.send(html);
});


app.post("/clubon-return", (req, res) => {
  const data = req.body.json;
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} >
        <ReturnPage data={data}/>
      </StaticRouter>
    </Provider>
  );

  const html = `
     <html>
      <head>
        <title>飢餓三十聚樂邦報名</title>
       </head>
       <body>
         <div id="root">${content}</div>
         <script src="bundle.js"></script>
       </body>
     </html>
   `;

  res.send(html);
})

app.listen(3000, () => {
  console.log("listening on port 3000");
});
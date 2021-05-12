import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from 'react-router-config';
import routes from './client/routes';

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded())

app.get("*", (req, res) => {
  const content = renderToString(
    <StaticRouter location={req.path}>
      {renderRoutes(routes)}
    </StaticRouter>
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
  console.log(req.body.json)
  const content = renderToString(
    <StaticRouter location={req.path}>
      {renderRoutes(routes)}
    </StaticRouter>
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
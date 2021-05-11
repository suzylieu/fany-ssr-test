import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./client/App";

const app = express();

app.use(express.static("public"));
app.get("*", (req, res) => {
  const content = renderToString(
    <StaticRouter location={req.path}>
      <App />
    </StaticRouter>
  );

  const html = `
     <html>
       <head>
       <title>fany ssr</title>
       </head>
       <body>
         <div id="root">${content}</div>
         <script src="bundle.js"></script>
       </body>
     </html>
   `;

  res.send(html);
});

app.post("/return", (req, res) => {
  const content = renderToString(
    <StaticRouter location={req.path}>
      <App res={res} />
    </StaticRouter>
  );

  const html = `
     <html>
       <head>
       <title>fany ssr</title>
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
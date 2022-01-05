const email = (title, body) => `<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="UTF-8">
    <style>
      body{
        background: rgb(255, 221, 128);
        margin: 0;
        padding: 50px 0;
        box-sizing: border-box;
        min-height: 100vh;
        font-family: Bookman Old Style, sans, sans-serif;
      }
      #title{
        font-family: Bookman Old Style, sans, sans-serif;
        text-align: center;
        color: rgb(75, 75, 75);
        font-size: 3em;
        margin: 0;
        margin-bottom: 30px;
      }
      #body{
        width: 100%;
        max-width: 500px;
        margin: auto;
        background: rgb(255, 255, 255);
        padding: 20px;
        min-height: 400px;
        z-index: 5;
        color: rgb(100,100,100);
      }
      p{
        font-size: 18px;
        color: rgb(100,100,100);
        line-height: 30px;
        max-width: 90%;
        position: relative;
        margin: auto;
      }
      hr{
        margin: 20px 0;
        width: 100%;
        border: none;
        border-top: solid rgb(235,235,235) 1px;
      }
      a{
        color: #57ABFF !important;
      }
      .block-image{
        width: 90%;
        margin: 5%;
        margin-bottom: 10px;
        border-radius: 5px;
      }
      h2{
        text-align: left;
        margin-top: 20px;
        margin-bottom: 0;
        margin-left: 0;
        font-size: 30px;
        color: rgb(50,50,50);
        font-weight: bold;
      }
      #bodycont{
        color: rgb(100,100,100);
        padding: 0 20px;
        hyphens: auto;
        font-size: 17px;
        line-height: 30px;
      }
    </style>
  </head>
  <body>
    <div id="body" class="overlayElement">
      <h1 id="title">${Title}</h1>
      <div id="bodycont">
      ${body}

        <hr/>
        &copy; Kuhn Hong 2022
      </div>
    </div>
  </body>
</html>`
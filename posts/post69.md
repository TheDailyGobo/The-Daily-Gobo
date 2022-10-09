## how to create a hacked button
<sup>it's not a bug, it's a feature.</sup>

1. make a button
2. add "onclick" attribute
3. add some funny code (here i play audio and wait a bit, and then delete the whole page client side)
4. add some vague text
5. profit

<button onclick="
      const go = async () => {
          var aud = new Audio('https://gravetechnogreenware.jaxonbaxon.repl.co/game.mp3'); 
          const delay = ms => new Promise(res => setTimeout(res, ms)); 
          aud.play(); 
          await delay(5000); 
          document.body.remove(); 
      } 
      go();">delete everything on the page</button>
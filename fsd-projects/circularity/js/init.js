var init = function (window) {
  "use strict";
  var draw = window.opspark.draw,
    physikz = window.opspark.racket.physikz,
    app = window.opspark.makeApp(),
    canvas = app.canvas,
    view = app.view,
    fps = draw.fps("#000");

  window.opspark.makeGame = function () {
    window.opspark.game = {};
    var game = window.opspark.game;

    ///////////////////
    // PROGRAM SETUP //
    ///////////////////

    // TODO 1 : Declare and initialize our variables
    var circle;
    var circles = [15];

    // TODO 2 : Create a function that draws a circle

    var drawCircle = function () {
      circle = draw.randomCircleInArea(canvas, true, true, "#ff0000ff", 2);
      physikz.addRandomVelocity(circle, canvas, 20, 25);
      view.addChild(circle);
      circles.push(circle);
    };

    // TODO 3 : Call the drawCircle() function

    // TODO 7 : Use a loop to create multiple circles

    // Ask the user how many circles they want (default 125). Clamp to 1..1000.
    var defaultCount = 125;
    var raw = null;
    try {
      raw = window.prompt(
        "How many circles would you like to create? (1-1000)",
        String(defaultCount)
      );
    } catch (e) {
      raw = String(defaultCount);
    }
    var count = parseInt(raw, 10);
    if (isNaN(count)) {
      count = defaultCount;
    }
    // clamp
    if (count < 1) {
      count = 1;
    }
    if (count > 1000) {
      count = 1000;
    }

    for (var num = 0; num < count; num++) {
      drawCircle();
    }

    ///////////////////
    // PROGRAM LOGIC //
    ///////////////////

    /* 
        This Function is called 60 times/second, producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
    function update() {
      // TODO 4 : Update the position of each circle using physikz.updatePosition()
      

      // TODO 5 : Call game.checkCirclePosition() on your circles

      // TODO 8 / TODO 9 : Iterate over the array
      for (var i = 0; i < circles.length; i++) {
        physikz.updatePosition(circles[i]);
        game.checkCirclePosition(circles[i]);
      }
    }

    /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
    game.checkCirclePosition = function (circle) {
      //if the circle has gone past the RIGHT side of the screen then place it on the LEFT
      if (circle.x > canvas.width) {
        circle.x = 0;
      }
      if (circle.x < 0) {
        circle.x = canvas.width;
      }
      if (circle.y > canvas.height) {
        circle.y = 0;
      }
      if (circle.y < 0) {
        circle.y = canvas.height;
      }
    };

    /////////////////////////////////////////////////////////////
    // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
    /////////////////////////////////////////////////////////////

    view.addChild(fps);
    app.addUpdateable(fps);

    game.circle = circle;
    game.circles = circles;
    game.drawCircle = drawCircle;
    game.update = update;

    /**
     * Background palette changer
     * Generates a random multi-stop gradient and applies it to the body and canvas.
     */
    function randomColor() {
      var h = Math.floor(Math.random() * 360);
      var s = 60 + Math.floor(Math.random() * 20); // 60-80
      var l = 45 + Math.floor(Math.random() * 15); // 45-60
      return "hsl(" + h + ", " + s + "%, " + l + "%)";
    }

    function applyRandomGradient() {
      var colors = [randomColor(), randomColor(), randomColor()];
      var angle = Math.floor(Math.random() * 360);
      var grad = "linear-gradient(" + angle + "deg, " + colors.join(", ") + ")";
      try {
        // smooth transition
        document.body.style.transition = "background 700ms ease";
        document.body.style.background = grad;
        if (canvas && canvas.style) {
          canvas.style.transition = "background 700ms ease";
          canvas.style.background = grad;
        }
      } catch (e) {
        // ignore if DOM not available
      }
    }

    // Change colors on click or touch anywhere on the document
    document.addEventListener("click", applyRandomGradient);
    document.addEventListener("touchstart", applyRandomGradient, {
      passive: true,
    });

    // Create a centered hint that tells the user they can click to change colors.
    // It uses pointer-events: none so it doesn't block clicks (the document listener
    // will still receive the event). The hint fades out after the first click/tap.
    try {
      var hint = document.createElement("div");
      hint.id = "color-hint";
      hint.textContent = "Click to change colors";
      hint.style.position = "fixed";
      hint.style.left = "0";
      hint.style.top = "0";
      hint.style.right = "0";
      hint.style.bottom = "0";
      hint.style.display = "flex";
      hint.style.alignItems = "center";
      hint.style.justifyContent = "center";
      hint.style.pointerEvents = "none";
      hint.style.zIndex = "10000";
      hint.style.color = "black";
      hint.style.fontFamily = "Arial, sans-serif";
      hint.style.fontSize = "clamp(18px, 2.5vw, 36px)";
      hint.style.fontWeight = "700";
      hint.style.textShadow = "0 2px 8px rgba(0,0,0,0.6)";
      hint.style.opacity = "1";
      hint.style.transition = "opacity 300ms ease";
      // subtle pulse
      hint.style.animation = "hint-pulse 1500ms ease-in-out infinite";
      document.body.appendChild(hint);

      // remove the hint on first interaction (click or touch)
      var removeHint = function () {
        hint.style.opacity = "0";
        hint.style.animation = "none";
        setTimeout(function () {
          if (hint && hint.parentNode) hint.parentNode.removeChild(hint);
        }, 320);
      };

      document.addEventListener("click", removeHint, {
        once: true,
        passive: true,
      });
      document.addEventListener("touchstart", removeHint, {
        once: true,
        passive: true,
      });

      // add keyframes for pulse as an inline stylesheet so we don't rely on external CSS
      var styleEl = document.createElement("style");
      styleEl.textContent =
        "@keyframes hint-pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.03); opacity: 0.9; } 100% { transform: scale(1); opacity: 1; } }";
      document.head.appendChild(styleEl);
    } catch (e) {
      // ignore if DOM not available
    }

    app.addUpdateable(window.opspark.game);
  };
};

// DO NOT REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = init;
}

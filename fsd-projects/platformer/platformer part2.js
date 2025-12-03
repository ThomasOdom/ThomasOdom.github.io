$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "white smoke"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    // toggleGrid();


    // TODO 2 - Create Platforms
// createPlatform(625, 650, 50, 5);
// createPlatform(400, 515, 50, 5);
// createPlatform(200, 100, 0.25, 500);
// createPlatform(200, 377, 80, 5);
// createPlatform(530, 300, 570, 5);
// createPlatform(1100, 100, 0.25, 200);
// createPlatform(700, 500, 100, 5);
// createPlatform(1100, 400, 300, 5);
// createPlatform(1100, 500, 5, 250);
// createPlatform(1050, 625, 50, 0.35);
// createPlatform(1100, 650, 20, 5);
// createPlatform(1380, 650, 20, 5);
// createPlatform(1200, 600, 50, 5);
// createPlatform(1200, 500, 0.35, 100);
// createPlatform(1100, 500, 100, 0.35);
// createPlatform(1300, 600, 0.35, 150);
// createPlatform(1200, 700, 100, 1);


// Today is 12/1/25 we are making a new pltformer


createPlatform(1200, 700, 100, 10, "lightgrey");
createPlatform(900, 590, 100, 10, "lightgrey");
createPlatform(545, 500, 110, 10, "lightgrey");
createPlatform(200, 400, 110, 5, "lightgrey");
createPlatform(1200, 700, 100, 1, "lightgrey");
createPlatform(200, 100, 0.25, 500, "lightgrey");
createPlatform(995, 100, 5, 305, "lightgrey");
createPlatform(1400, 100, 5, 300, "lightgrey");
createPlatform(1100, 100, 300, 5, "lightgrey");
createPlatform(995, 405, 400, 5, "lightgrey");
createPlatform(500, 295, 100, 10, "lightgrey");
createPlatform(800, 200, 100, 10, "lightgrey");
createPlatform(1000, 200, 300, 1, "lightgrey");
createPlatform(1300, 200, 0.85, 100, "lightgrey");
createPlatform(1250, 300, 1, 100, "lightgrey");
createPlatform(1200, 200, 0.85, 100, "lightgrey");
createPlatform(1150, 300, 1, 100, "lightgrey");
createPlatform(1100, 200, 0.85, 100, "lightgrey");
createPlatform(1050, 285, 1, 115, "lightgrey");
createPlatform(1350, 300, 50, 0.45, "lightgrey");
createPlatform(1350, 300, 0.45, 106, "lightgrey")
createPlatform(200, 200, 100, 0.25, "lightgrey");
    // TODO 3 - Create Collectables
// createCollectable("diamond", 1155, 501, 0);
// createCollectable("database", 740, 400, 0.5, 1);
// createCollectable("steve", 1055, 150, 0.5, 1);


// Today is 12/1/25 we are making a new pltformer


createCollectable("diamond", 1000, 342, 0);
createCollectable("database", 1350, 25, 0.5, 1);
createCollectable("steve", 225, 100, 1.5, 1);
    // TODO 4 - Create Cannons
// createCannon("top", 800, 1250);
// createCannon("top", 900, 1250);
//  createCannon("top", 1000, 1250);
//  createCannon("right", 750, 1650);
// createCannon("top", 200, 1200);
    

// Today is 12/1/25 we are making a new pltformer


createCannon("right", 750, 2099);
createCannon("right", 650, 2500);
createCannon("left", 100, 2500);
createCannon("right", 400, 2500);
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});

// createCanvas() is called when the page is loaded and assigned to exp.canvas variable
// it has one private function - generateCoords() - can be called only in createCanvas()
// and one public function canvas.draw() - that can be called from the browser's console or other functions
var createCanvas = function() {
	var canvas = {};

	// this is a function that generates the coordinates
	// they are always the same for each picture
	// the function returns a list ot 16 objects each one containing xPos, yPos
	// and their corresponding values (which are generated by this function)
	var generateCoords = function() {
		var step = 50;
		var coords = [];

		// setting values for all the 16 shapes
		for (var i = 0; i < 16; i++) {
			// the first 2 are in the top left part
			if (i < 4) {
				coords.push({
					xPos: (i+1)*step,
					yPos: step
				});
			// the second 4 are in the bottom left part
			} else if (i < 8) {
				coords.push({
					xPos: (i-3)*step,
					yPos: 2*step
				});
			// the third 4 are in the top right part
			} else if (i < 12) {
				coords.push({
					xPos: (i-2)*step,
					yPos: step
				});
			// the last 4 are in the bottom right part
			} else {
				coords.push({
					xPos: (i-6)*step,
					yPos: 2*step
				});
			}
		}

		// after the for loop coords look like [{xPos: 50 yPos: 50}, {xPos: 100 yPos: 50}..]
		return coords;
	};

	// func that draws shapes
	// it gets 3 arguments -  the shape that it is supposed to draw
	// the index of the shape that it is drawing (so that it knows where to draw it)
	// the context - ?
	var drawShape = function(shape, index, context) {
		var coords = generateCoords();

		context.beginPath();

		if (shape === 'circular') {
			context.arc(coords[index]["xPos"], coords[index]["yPos"], 20, 0, 2*Math.PI);
		} else if (shape === 'squared') {
			context.rect(coords[index]["xPos"]-20, coords[index]["yPos"]-20, 40, 40);
		} else if (shape === 'triangular') {
			context.moveTo(coords[index]["xPos"], coords[index]["yPos"]+15);
    		context.lineTo(coords[index]["xPos"]+40, coords[index]["yPos"]+15);
    		context.lineTo(coords[index]["xPos"]+20, coords[index]["yPos"]-15);
		} else {
			console.log('there is no such shape - ' + shape);
		}

		context.stroke();
		context.closePath();
	};


	// this is a public function
	// it takes one argument - the number of black shapes and paints as many shapes in black as the number
	// and returns an object
	canvas.draw = function(blacksLeft, mainShape, blacksRight, secondShape, side) {
		// these are declared in the beginning before drawing has begun so that 
		// all the shapes are drawn on the same canvas
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");

		// draws on the left
		if (side === 'left') {
			for (var i=0; i<16; i++) {
				if (i < 8) {
					drawShape(mainShape, i, context);
					if (i < blacksLeft) {
						context.fillStyle = "black";
						context.fill();
					} else {
						context.fillStyle = "white";
						context.fill();
					}
				} else {
					drawShape(secondShape, i, context);
					if (i < blacksRight + 8) {
						context.fillStyle = "black";
						context.fill();
					} else {
						context.fillStyle = "white";
						context.fill();
					}
				}
			}
			
		// draws on the right
		} else if (side === 'right') {
			for (var i=0; i<16; i++) {
				if (i < 8) {
					drawShape(secondShape, i, context);
					if (i <  blacksLeft) {
						context.fillStyle = "black";
						context.fill();
					} else {
						context.fillStyle = "white";
						context.fill();
					}
				} else {
					drawShape(mainShape, i, context);
					if (i < blacksRight + 8) {
						context.fillStyle = "black";
						context.fill();
					} else {
						context.fillStyle = "white";
						context.fill();
					}
				}
			}
		} else {
			console.log('there is no such side');
		}
	};

	canvas.createSentence = function(quant, color, shape) {
		document.querySelector('#sentence').innerHTML = quant.charAt(0).toUpperCase() + quant.slice(1) + ' of the ' + shape + ' shapes are ' + color;
	};

	return canvas;
};
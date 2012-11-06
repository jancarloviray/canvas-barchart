/*
TODO
- cleanup and organize
- make into modules
- make this a usable library -> upload to github
- makeBarGraph(data,options)
- options: title, legend, fontsize, fontcolor, background, gridcolor
*/

var app = (function(){

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var data = [60,40,78,59,84,95,63,42,31,53,56,53,43,13,53,64,13];

	var canvasHeight = canvas.height, canvasWidth = canvas.width,
	  barGap = 5, barWidth = 20, barPosX = 5;

	function init(){
		autoResizeToCanvas();
		prepareCanvas();
		drawGrid();
		drawGraph();
	}

	function prepareCanvas(){
		//rect(x,y,width,height)
		ctx.fillStyle = 'rgb(30,30,30)';
		ctx.fillRect(0,0,400,200);
	}

	function autoResizeToCanvas(){
		//why canvasWidth - 5? --> to fix last bar touching edge
		//why - barGap? --> to fix first bar touching edge
		barWidth = ((canvasWidth-5) / data.length) - barGap;
	}

	function drawGraph(){
		for( var i = 0; i < data.length; i++ ){
		  
			//change color based on previous data
			if(data[i] < data[i-1]) ctx.fillStyle = 'rgba(250,100,100,.7)';
			else ctx.fillStyle = 'rgba(50,250,200,.8)';

			//ctx.fillRect(barPosX,0,barWidth,data[i]);
			//why change? since origin is top-left; see -data[i] and canvasHeight
			ctx.fillRect(barPosX,canvasHeight,barWidth,-data[i]); 

			ctx.fillStyle = 'white';
			ctx.font = 'bold 13px Arial';
			ctx.fillText( data[i], barPosX, canvasHeight - data[i] - 7 );

			barPosX += barWidth + barGap;
		}
	}

	function drawGrid(){
		var gridGap = canvasHeight / 10, currentGridY = 0;
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgb(50,50,50)';
		
		for( var i = 1; i <= 100; i++ ) {
			ctx.beginPath();
			ctx.moveTo(0,currentGridY);
			ctx.lineTo(canvasWidth,currentGridY);
			ctx.closePath();
			ctx.stroke();
			currentGridY += gridGap;
		}  
	}
  
  return {
    init : init
  };
  
    
})();

app.init();

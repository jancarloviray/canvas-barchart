//code by Jan Carlo Viray virayjancarlo@yahoo.com

//OPTIONS:
//barGap 5, barWidth 20, barPosX 5
//backgroundColor, fontColor, fontSettings, gridColor

var BarChart = ( function() {
	
	console.log('loaded');
	var canvas, ctx, data, options,
		canvasHeight, canvasWidth, barGap, barWidth, barPosX;
	
	function init( canvasId, userData, userOptions){
		canvas = document.getElementById( canvasId );
		ctx = canvas.getContext('2d');
		
		data = userData || [];
		options = userOptions || {};
		
		canvasHeight = canvas.height;
		canvasWidth = canvas.width;
		barGap = options.barGap || 5;
		barWidth = options.barWidth || 20;
		barPosX = options.barPosX || 5;
		
		autoResizeToCanvas();
		prepareCanvas();
		drawGrid();
		drawGraph();
		drawTitle();
	}

	function prepareCanvas() {
		ctx.fillStyle = options.backgroundColor || 'rgb(30,30,30)';
		ctx.fillRect( 0, 0, canvasWidth, canvasHeight );
	}

	function autoResizeToCanvas(){
		//why canvasWidth - 5? --> to fix last bar touching edge
		//why - barGap? --> to fix first bar touching edge
		barWidth = ( ( canvasWidth - barGap ) / data.length ) - barGap;
	}

	function drawGraph() {
		for( var i = 0; i < data.length; i++ ){
		  
			//change color based on previous data
			if( data[i] < data[i-1] ) ctx.fillStyle = 'rgba(250,100,100,.7)';
			else ctx.fillStyle = 'rgba(50,250,200,.8)';

			//ctx.fillRect(barPosX,0,barWidth,data[i]);
			//why change? since origin is top-left; see -data[i] and canvasHeight
			ctx.fillRect( barPosX, canvasHeight, barWidth, -data[i] ); 

			ctx.fillStyle = options.fontColor || 'white';
			ctx.font = options.fontSettings || 'bold 13px Arial';
			ctx.fillText( data[i], barPosX, canvasHeight - data[i] - 7 );

			barPosX += barWidth + barGap;
		}
	}

	function drawGrid() {
		var gridGap = canvasHeight / 10, currentGridY = 0;
		ctx.lineWidth = 2;
		ctx.strokeStyle = options.gridColor || 'rgb(50,50,50)';
		
		for( var i = 1; i <= 100; i++ ) {
			ctx.beginPath();
			ctx.moveTo( 0, currentGridY );
			ctx.lineTo( canvasWidth, currentGridY );
			ctx.closePath();
			ctx.stroke();
			currentGridY += gridGap;
		}  
	}
	
	function drawTitle(){
		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.font = options.titleFontSettings || 'bold 18px Arial';
		ctx.fillText( 
			options.title || 'Sample Data', 
			options.titlePosX || 10,
			options.titlePosY || 30
		);
	}
  
  return {
    render : init
  };
})();



var ladderMap = [
	{
		startPos: '3',
		endPos: '67'
	},
	// {
	// 	startPos: '27',
	// 	endPos: '82'
	// }
];

var snakeMap = [
	{
		startPos: '97',
		endPos: '2'
	},
	{
		startPos: '79',
		endPos: '9'
	}
];

var initialPosition = {
	playerOnePos: '1',
	playerTwoPos: '1'
};

var ladderCells = [];
var snakeCells = [];

var gameBoard = { 
	createBoard: function(dimension, mount) {
		var mountPoint = document.querySelector("#grid");
		if ( !dimension || isNaN(dimension) || !(parseInt(dimension, 10))) {
			return false;
		} else {
			dimension = typeof dimension === 'string' ? parseInt(dimension, 10) : dimension;
			
			var table = document.createElement('table'),
				row = document.createElement('tr'),
				cell = document.createElement('td'),
				rowClone,
				cellClone;

			var output;
			for ( var r = 0; r < dimension; r ++) {
				rowClone = row.cloneNode(true);
				table.appendChild(rowClone);
				for ( var c = 0; c < dimension; c++) {
					cellClone = cell.cloneNode(true);
					rowClone.appendChild(cellClone);
				}
			}
			mountPoint.appendChild(table);
			output = gameBoard.enumerateBoard(table);
		}

		return output;
	},

	enumerateBoard: function(board) {
		var rows = board.getElementsByTagName('tr'),
			text = document.createTextNode(''),
			rowCounter = 1,
			size = rows.length,
			cells,
			cellsLength,
			cellNUmber,
			odd = false,
			control = 0;

		for (var r = size - 1; r >= 0; r--) {
			cells = rows[r].getElementsByTagName('td');
			cellsLength = cells.length;
			rows[r].className = r % 2 === 0 ? 'even' : 'odd';
			odd = ++control % 2 == 0 ? true : false;
			size = rows.length;
			for (var i = 0; i < cellsLength; i++) {
				if (odd == true) {
					cellNUmber = --size + rowCounter - i;
				} else {
					cellNUmber = rowCounter;
				}
				cells[i].className = i % 2 == 0 ? 'even' : 'odd';
				cells[i].id = cellNUmber;
				cells[i].appendChild(text.cloneNode());
				cells[i].firstChild.nodeValue = cellNUmber;
				rowCounter++
			}
		}
		// var lastRow = rows[0].getElemenetsByTagname('td');
		// lastRow[0].id = '100';
		// var firstRow = rows[9].getElemenetsByTagname('td');
		// firstRow[0].id = 
		return gameBoard;
	},

	linedraw: function(ax,ay,bx,by) {
	    if(ay>by) {
	        bx=ax+bx;  
	        ax=bx-ax;
	        bx=bx-ax;
	        by=ay+by;  
	        ay=by-ay;  
	        by=by-ay;
	    }
	    var calc=Math.atan((ay-by)/(bx-ax));
	    calc=calc*180/Math.PI;
	    var length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
	    document.getElementById('grid').innerHTML += "<div id='line' style='height:" + length + "px;width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
		
		//var grid = document.getElementById('grid');
		//grid.appendChild("<div id='line' style='height:" + length + "px;width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>")
	},

	getOffset: function(el) {
		var rect = el.getBoundingClientRect();
		return {
			left: rect.left + window.pageXOffset,
			top: rect.top + window.pageYOffset,
			width: rect.width || el.offsetWidth,
			height: rect.height || el.offsetHeight
		};
	},
	
	connect: function(div1, div2, color, thickness) { // draw a line connecting elements
		var off1 = gameBoard.getOffset(div1);
		var off2 = gameBoard.getOffset(div2);
		// bottom right
		var x1 = off1.left + off1.width;
		var y1 = off1.top + off1.height;
		// top right
		var x2 = off2.left + off2.width;
		var y2 = off2.top;
		// distance
		var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
		// center
		var cx = ((x1 + x2) / 2) - (length / 2);
		var cy = ((y1 + y2) / 2) - (thickness / 2);
		// angle
		var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
		// make hr
		var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
		//
		// alert(htmlLine);
		document.body.innerHTML += htmlLine;
	},

	createLadders: function(ladderMap) {
		ladderMap.forEach((obj, i) => {
			ladderCells.push(obj.startPos);
			gameBoard.connect(document.getElementById(obj.startPos), document.getElementById(obj.endPos), 'green', 1);
		})
	},

	placePlayersOnBoard: function(posObj) {
		var player1 = document.createElement('span'),
			player1text = document.createTextNode('P1');
		player1.setAttribute('style', 'background: red');
		player1.appendChild(player1text);

		document.getElementById(posObj.playerOnePos).appendChild(player1);
	}
};

function startGame() {
	window.alert("Let's start");
}

gameBoard.createBoard(10, "grid");

gameBoard.createLadders(ladderMap);
gameBoard.placePlayersOnBoard(initialPosition);
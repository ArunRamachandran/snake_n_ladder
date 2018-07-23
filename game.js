
var ladderMap = [
	{
		startPos: '3',
		endPos: '67'
	},
	{
		startPos: '27',
		endPos: '82'
	}
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

	linedraw: function(ax,ay,bx,by)
	{
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

	createLadders: function(ladderMap) {
		ladderMap.forEach((obj, i) => {
			ladderCells.push(obj.startPos);

			var startPosChildLeft = document.getElementById(obj.startPos).offsetLeft,
				startParentPosLeft = document.getElementById(obj.startPos).parentElement.offsetLeft,
				startPosChildTop = document.getElementById(obj.startPos).offsetTop,
				startParentPosTop = document.getElementById(obj.startPos).parentElement.offsetTop,
				startingCoOrdinates;

			startingCoOrdinates = {
				x: startPosChildTop - startParentPosTop,
				y: startPosChildLeft - startParentPosLeft
			};

			var endPosChildLeft = document.getElementById(obj.endPos).offsetLeft,
				endParentPosLeft = document.getElementById(obj.endPos).parentElement.offsetLeft,
				endPosChildTop = document.getElementById(obj.endPos).offsetTop,
				endParentPosTop = document.getElementById(obj.endPos).parentElement.offsetTop,
				endingCoOrdinates;

			endingCoOrdinates = {
				x: endPosChildTop - endParentPosTop,
				y: endPosChildLeft - endParentPosLeft
			};

			// var startingCoOrdinates = document.getElementById(obj.startPos).offsetLeft,
			// 	endingCoOrdinates = document.getElementById(obj.endPos).offsetTop;

			// var startingCoOrdinates = document.getElementById(obj.startPos).offset(),
			// 	endingCoOrdinates = document.getElementById(obj.endPos).offset();

			// var strtParentCord = document.getElementById(obj.startPos).parent().offset(),
			// 	endParentCord = document.getElementById(obj.endPos).parent().offset();



			var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    			scrollTop = window.pageYOffset || document.documentElement.scrollTop;

			gameBoard.linedraw(startingCoOrdinates.x + scrollLeft, startingCoOrdinates.y + scrollTop, endingCoOrdinates.x + scrollLeft, endingCoOrdinates.y + scrollTop);
		})
	}
};

function startGame() {
	window.alert("Let's start");
}

gameBoard.createBoard(10, "grid");

gameBoard.createLadders(ladderMap);
define([
	'src/StretchedHexagonalHexGrid',
	'src/Draw',
	'src/GameBoard',
        'src/Tower',
        'src/RangedMinion',
        'src/MeleeMinion'
], function(StretchedHexagonalHexGrid, Draw, GameBoard, Tower, Ranged, Melee) {
	var paper = new Raphael(document.getElementById('canvas_container'), 1200, 500);
	var grid = new StretchedHexagonalHexGrid(4, 8, true);
	var draw = new Draw(paper, grid, 25);
	var board = new GameBoard(grid, draw);


	var tower  = [[8, -8, 0]];
	var ranged = [[7, -7, 0], [7, -8, 1], [8, -7, -1]];
	var melee  = [[5, -5, 0], [5, -6, 1], [6, -5, -1]];

	function mult(coords, player) {
		var rval = [];
		for (var i = 0; i < coords.length; ++i) {
			rval[i] = coords[i] * player;
		}
		return rval;
	}

	function asym(coords, player) {
		if (player === -1) return coords;
		else return [coords[0] + 1, coords[1] - 1, coords[2]];
	}

	tower.forEach(function(coords) {
		for (var player = -1; player <= 1; player += 2) {
			board.addEntity(asym(mult(coords, player), player), new Tower(player));
		}
	});
	melee.forEach(function(coords) {
		for (var player = -1; player <= 1; player += 2) {
			board.addEntity(asym(mult(coords, player), player), new Melee(player));
		}
	});
	ranged.forEach(function(coords) {
		for (var player = -1; player <= 1; player += 2) {
			board.addEntity(asym(mult(coords, player), player), new Ranged(player));
		}
	});

	document.getElementById('next_turn').onclick = function() {
		board.update();
	};
});

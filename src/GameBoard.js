define([], function() {
	function GameBoard(grid, draw) {
		this.grid = grid;
		this.draw = draw;
		this.objects = [];
		draw.drawGrid();

		this.addEntity = function(xyz, entity) {
			var cell = this.grid.cellAt({'xyz': xyz});
			cell.object = entity;
			entity.img = draw.addEntity(cell);
			this.objects.push(entity);
		}

		this.moveEntity = function(from, to) {
			var fromCell = grid.cellAt({'xyz': from});
			var toCell = grid.cellAt({'xyz': to});
			if (toCell.object) {
				throw "Illegal move: cell occupado";
			}
			toCell.object = fromCell.object;
			fromCell.object = null;
			draw.moveEntity(toCell);
		}

		this.find = function(object) {
			for (var cell in grid) {
				if (cell.object == object) {
					return cell;
				}
			}
			return null;
		}

		this.update = function() {
			var board = this;
			this.objects.forEach(function(object) {
				var action = object.act(grid);
				if (action.move) {
					var from = board.find(object).xyz;
					var to = [];
					for (var i = 0; i < 3; ++i) {
						to[i] = from[i] + action.move[i];
					}
					board.moveEntity(from, to);
				}
			});
		}
	}

	return GameBoard;
});
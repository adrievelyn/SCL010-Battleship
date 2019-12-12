import React from 'react';
import Square from './Square'
import _ from 'lodash';

const SHIPTYPE = {
  SUBMARINE: 'submarine',
  BATTLE_SHIP: 'battleship',
  CRUISER: 'cruiser',
  DESTROYER: 'destroyer',
  PATROL_BOAT: 'patrolBoat'
};

const SHIPS = [SHIPTYPE.SUBMARINE,
  SHIPTYPE.BATTLE_SHIP,
  SHIPTYPE.CRUISER,
  SHIPTYPE.DESTROYER,
  SHIPTYPE.PATROL_BOAT];

const SHIPSIZE = {
  SUBMARINE: 5,
  BATTLE_SHIP: 4,
  CRUISER: 3,
  DESTROYER: 2,
  PATROL_BOAT: 1
};

const SHIP_ORIENTATION = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
  ISPORTRAIT: true
};

let CURRENTSHIP = null;
let SHIPS_PROTOTYPE = SHIPS.slice();

class BoardX extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      squares: [],
      ships:[],
      isPortrait: SHIP_ORIENTATION.ISPORTRAIT,
      shipAdded: true,
      shipAmount: {
        battleship: 1,
        submarine: 1,
        cruiser: 1,
        destroyer: 1,
        patrolBoat: 1
      },
      hitPos: [],
      missedPos: [],
      xIsNext: true,
    };

    this.changeOrientation = this.changeOrientation.bind(this);
    this.ships = [];
    this.squares = [];
    this.addShip = this.addShip.bind(this);
    this.createShipWithPos = this.createShipWithPos.bind(this);
    this.checkAvailable = this.checkAvailable.bind(this);
    this.changeOrientation = this.changeOrientation.bind(this);
    this.allShipsPosition = this.allShipsPosition.bind(this);
    this.boardBuild = this.boardBuild.bind(this);

  }



  changeOrientation() {
    this.setState({
      isPortrait: !this.state.isPortrait
    });
  }

  checkRange(x, y, ship) {
    if (ship.orientation === SHIP_ORIENTATION.PORTRAIT) {
      if (y <= this.props.size - ship.size) {
        return true;
      }
    } else {
      if (x <= this.props.size - ship.size) {
        return true;
      }
    }

    return false;
  }  

  allShipsPosition(ships) {
    return _.map(ships, (ship) => {
      return this.positionsShip(ship);
    });
  }

  sizeShip(TYPE) {
    switch (TYPE) {
    case SHIPTYPE.PATROL_BOAT:
      return SHIPSIZE.PATROL_BOAT;

    case SHIPTYPE.BATTLE_SHIP:
      return SHIPSIZE.BATTLE_SHIP;

    case SHIPTYPE.CRUISER:
      return SHIPSIZE.CRUISER;

    case SHIPTYPE.DESTROYER:
      return SHIPSIZE.DESTROYER;

    case SHIPTYPE.SUBMARINE:
      return SHIPSIZE.SUBMARINE;

    default:
      return 0;
    }
  }

  checkAvailable(x, y, newShip, posNewShip) {
    const currentShips = _.flatten(this.allShipsPosition(this.ships));

    // Check to see if any overlap ?
    const overlapPos = _.find(currentShips, (ship) => {
      return _.find(posNewShip, (pos) => {
        return pos.x === ship.x && pos.y === ship.y;
      });
    });

    if (overlapPos || !this.checkRange(x, y, newShip)) {
      return false;
    }

    return true;
  }

  positionsShip(ship) {
    const positions = [];

    if (ship.orientation === SHIP_ORIENTATION.PORTRAIT) {
      let currentIndex = ship.y;
   

      for (let i = 1; i <= ship.size; i++) {
        positions.push({
          x: ship.x,
          y: currentIndex++,
          shipType: ship.type
        });
      }
    } else {
      let currentIndex = ship.x;

      for (let i = 1; i <= ship.size; i++) {
        positions.push({
          x: currentIndex++,
          y: ship.y,
          shipType: ship.type
        });
      }
    }

    return positions;
  }
  createShipWithPos(TYPE, x, y, orientation = this.state.isPortrait) {
    const shipSize = this.sizeShip(TYPE);

    if (orientation) {
      return {
        orientation: SHIP_ORIENTATION.PORTRAIT,
        x: x,
        y: y,
        type: TYPE,
        size: shipSize
      };
    }

    return {
      orientation: SHIP_ORIENTATION.LANDSCAPE,
      x: x,
      y: y,
      type: TYPE,
      size: shipSize

    };

  }
  boardBuild() {
    let index = 0;
    this.squares = [];

    for (let i = 0; i < 10; i++) {
      const cell = [];

      for (let j = 0; j <10; j++) {
        cell.push({
          x: i,
          y: j,
          idx: index
        });
        index++;
      }
      this.squares.push(cell);
      
    }

    
    return this.squares;
  }
  addShip(TYPE, x, y, orientation, ships = this.ships) {

    const newShip = this.createShipWithPos(TYPE, x, y, orientation);

    const posNewShip = this.positionsShip(newShip);

    if (this.checkAvailable(x, y, newShip, posNewShip)) {
      ships.push(newShip);

      if (this.state.ships.length === 5) {

      }

      return this.setState({
        ships: ships,
        shipAdded: true
      });
    }

    // Position is not available to place a ship
    return this.setState({
      shipAdded: false
    });
  }
  renderSquare(i) {
  	// {console.log(this.state.squares[i])}
    return (
      <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
    );
  }

  handleClick(i) {
  	 
    if (!CURRENTSHIP) {

      CURRENTSHIP = SHIPS_PROTOTYPE.shift();
      
    } else if (this.props.shipAdded) {
      CURRENTSHIP = SHIPS_PROTOTYPE.shift();
    }
    if (this.addShip) {
    	// const squares = this.state.squares.slice();

     	this.addShip(CURRENTSHIP, i, i);
    } else if (this.props.playerShoot) {
      // const shotPosition = {
      //   x: this.props.Xposition,
      //   y: this.props.Yposition
      // };
      // this.props.playerShoot(shotPosition);
    }
  }
  render() {
    const status = 'Player X: ' + (this.state.xIsNext ? 'X' : 'O');
    this.boardBuild();

		{this.squares.map(cell => {
		return (cell.map(square => {
			{console.log(square.x+' '+ square.y)}
		  return (
		   	<div> </div>
		  );
		}));
		})}
		
    return (
      <div className='Board1'>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
        </div>
        <div className="board-row">
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
        </div>
        <div className="board-row">
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
        </div>
        <div className="board-row">
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
          {this.renderSquare(48)}
          {this.renderSquare(49)}
        </div>
        <div className="board-row">
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
          {this.renderSquare(54)}
          {this.renderSquare(55)}
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
          {this.renderSquare(59)}
        </div>     
        <div className="board-row">
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
          {this.renderSquare(63)}
          {this.renderSquare(64)}
          {this.renderSquare(65)}
          {this.renderSquare(66)}
          {this.renderSquare(67)}
          {this.renderSquare(68)}
          {this.renderSquare(69)}
        </div>
        <div className="board-row">
          {this.renderSquare(70)}
          {this.renderSquare(71)}
          {this.renderSquare(72)}
          {this.renderSquare(73)}
          {this.renderSquare(74)}
          {this.renderSquare(75)}
          {this.renderSquare(76)}
          {this.renderSquare(77)}
          {this.renderSquare(78)}
          {this.renderSquare(79)}
        </div>
        <div className="board-row">
          {this.renderSquare(80)}
          {this.renderSquare(81)}
          {this.renderSquare(82)}
          {this.renderSquare(83)}
          {this.renderSquare(84)}
          {this.renderSquare(85)}
          {this.renderSquare(86)}
          {this.renderSquare(87)}
          {this.renderSquare(88)}
          {this.renderSquare(89)}
        </div>
        <div className="board-row">
          {this.renderSquare(90)}
          {this.renderSquare(91)}
          {this.renderSquare(92)}
          {this.renderSquare(93)}
          {this.renderSquare(94)}
          {this.renderSquare(95)}
          {this.renderSquare(96)}
          {this.renderSquare(97)}
          {this.renderSquare(98)}
          {this.renderSquare(99)}
        </div>
				<button onClick={this.changeOrientation}>{this.state.isPortrait ? SHIP_ORIENTATION.PORTRAIT : SHIP_ORIENTATION.LANDSCAPE}
        	
      	</button>
      </div>

    );
  }
}

export default BoardX;
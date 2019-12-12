import Ship from './../allShips';
import ship1 from '../../../img/vikingo.png';
import ship2 from '../../../img/vikingo.png';
import ship3 from '../../../img/vikingo.png';
import ship4 from '../../../img/vikingo.png';

export default class BattleShip extends Ship {

  buildShip() {
    return [
      ship1,
      ship2,
      ship3,
      ship4
    ];
  }
}

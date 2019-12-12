import React from 'react';
import Submarine from '../assets/img/Ships/Submarine';
import PatrolBoat from '../assets/img/Ships/PatrolBoat';
import Destroyer from '../assets/img/Ships/Destroyer';
import Cruiser from '../assets/img/Ships/Cruiser';
import BattleShip from '../assets/img/Ships/BattleShip';
import BattleField1 from '../assets/css/BattleField1.css';
import Hippo from '../assets/img/hippo.png';


class Ships extends React.Component {



  render() {
  	return (

<div className='bg'>
      <div className='general'>
      
      <div className='title'>
        <h1>Hola Astrid, yo soy Hipo hijo de Estoiko te informo que  tu tropa se compone de 24 vikingos que están reunidos en pequeños grupos, ve y organizalos, y si deseas una organización rápida también cuentas con la opción automática.</h1>
      </div>


      <div className='imgGamers'>
        <img src={Hippo} alt='Hippo'/>

        
      </div>
  


      
</div>
  
    


  		<div className='Ships'>
    		<Submarine/>
    		<BattleShip/>
    		<Cruiser/>
    		<Destroyer/>
    		<PatrolBoat/>
  		</div>

        </div>
  	)
  }

}

export default Ships;
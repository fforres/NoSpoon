import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import CANNON from 'cannon';
import physics from 'aframe-physics-system';
physics.registerAll();

class HUD extends Component {


    getPlayingHud = (lives) => (
        <a-entity
            geometry="primitive: plane; height: 0.3; width: 0.6"
            position="0.4 -0.4 -1"
            material="color: 0000FF; opacity: 0.5"
            text={[
                `align:center`,
                `color:white`,
                `value: Lives : ${lives}`,
            ].join(';')}
        />
    )

    LOOSER = (lives) => (
        <a-entity
            geometry="primitive: plane; height: 4; width: 4"
            position="0 0 -2"
            material="color: #FF0000; opacity: 0.7"
            text={[
                `align:center`,
                `color:white`,
                `value: YOU LOST!!`,
            ].join(';')}
        />
    )
    render(props) {
        const { lives, looser } = props;
        console.log(props)
        const hudContent = looser ? this.LOOSER() : this.getPlayingHud(lives) ;
        return (
            <a-entity camera look-controls>
                { hudContent }
            </a-entity>
        );
    }

}

export default HUD;


// text="width: 10.02; letterSpacing: 0.6; height: 1.59; color: white; align: center; font: https: //cdn.aframe.io/fonts/DejaVu-sdf.fnt; value: a-plane align: center (anchor: align) DejaVu width 8 1234567890123456789012345678901234567890"
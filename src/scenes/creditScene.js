import menuButton from '../render/menubutton.js';

 export default class creditScene extends Phaser.Scene{

    constructor()
    {
        super({key: 'creditScene'});

    }

    preload()
    {

    }

    create()
    {
        this.add.rectangle( 0, 0, 800, 600, 0x320045, 1).setOrigin(0,0);

        var title = this.add.text(100, 50,"Créditos", {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        title.setFontSize(100);
        title.setResolution(100);
        
        var backButton = new menuButton("Back to menu", this, 100, 50, 'start', 0.25, 0x880099, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        
        backButton.setScene('mainmenu');

        var layer = this.add.layer();

        layer.add([backButton, title]);
    }

    update(t, dt)
    {
        
    }

}
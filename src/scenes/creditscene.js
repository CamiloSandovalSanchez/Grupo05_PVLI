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

        var title = this.add.text(100, 80,"Créditos", {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        title.setFontSize(100);
        title.setResolution(100);
        
        var backButton = new menuButton("Back to menu", this, 100, 50, 'start', 0.25, 0x880099, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        
        backButton.setScene('mainmenu');
        
        var creditText = new menuButton(
            "Equipo de desarrollo:\nÁngel Seijas de Ema\nMiguel Gómez García\nCamilo Sandoval Sánchez\nSergio Higuera Gil\n" ,
            this, 
            350, 
            400, 
            'start', 
            0.35, 
            0x880099, 
            {fontFamily: 'Georgia, "Times New Roman", Times, serif'}
        );
        
        var charImage = this.add.image(670,250,'janitor');
        charImage.setScale(0.2);
        charImage.setFlipX(true);

    }

    update(t, dt)
    {
        
    }

}
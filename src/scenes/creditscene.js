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

        var charImage = this.add.image(670,250,'janitor');
        charImage.setScale(0.2);
        charImage.setFlipX(true);

        var title = this.add.text(100, 80,"Créditos", {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        title.setFontSize(100);
        
        
        var creditText = new menuButton(
            "Equipo de desarrollo:\nÁngel Seijas de Ema\nMiguel Gómez García\nCamilo Sandoval Sánchez\nSergio Higuera Gil\n" ,
            this, 
            0.4, 
            0.65, 
            0.35, 
            0x880099, 
            {fontFamily: 'Georgia, "Times New Roman", Times, serif'}
        );
        this.backbutton = new menuButton("Back to menu", this, 0.125, 0.1, 0.25, 0x880099, {fontFamily: 'Georgia, "Times New Roman", Times, serif'});
        
        this.backbutton.setScene('mainmenu');
        

    }

    update(t, dt)
    {
        this.backbutton.update(dt);
    }

}
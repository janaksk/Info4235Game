import { getTopPlayers } from "../firebase/leaderBoardUtil";
import { formatTime } from "../utils/formatTime.js";

class Level6Scene extends Phaser.Scene{
    constructor(){
        super({key: 'Level6Scene'});
    }

    init(data){
        this.cameras.main.fadeIn(800);
        this.user = data.user;
        this.level = data.level;
    }

    async create(){
        this.add
      .text(400, 50, "Leaderboard", { fontSize: "32px", fill: "#789" })
      .setOrigin(0.5);

      

      const leaderboard = await getTopPlayers();

        let yPosition = 100;
        leaderboard.forEach((entry, index) => {
            this.add
            .text(
                200,
                yPosition,
                `${index + 1}. ${(entry.username).toUpperCase()}: ${formatTime(entry.totalTime)}`,
                { fontSize: "24px", fill: "#789", align: 'left    ' }
            )
            .setOrigin(0,0);
            yPosition += 30;
        });

        this.time.delayedCall(
            10000,
            () => {
              this.scene.stop('Level6Scene');
              this.scene.start('MenuScene', { user: this.user });
            },
            [],
            this
          );

    

    }




}

export default Level6Scene;
export default class Result {
    id = 3;

    constructor(home, away, homeScore, awayScore, id = Result.id) {
        this.home = home;
        this.away = away;
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.id = id;

        Result.id = (Result.id === id) ? Result.id : Result.id++;
    } 
}
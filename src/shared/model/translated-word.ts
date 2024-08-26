export class TranslatedWord {
    guess:string;
    constructor(
        public origin : string,
        public target: string) 
        {
            this.guess=""
        }
        
    isMatch(){
        return this.target.toLowerCase() === this.guess.toLowerCase();
    }    
}
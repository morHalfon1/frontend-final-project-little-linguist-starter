export class TranslatedWord {
    guess:string;
    constructor(
        public origin : string,
        public target: string) 
        {
            this.guess="";
        }
        
    isMatch():boolean{
        
        return this.target.toLowerCase() === this.guess.toLowerCase();
    }    
}
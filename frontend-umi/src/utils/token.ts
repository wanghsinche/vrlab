class Token {
    private permanent = true;
    private token = '';
    set val (t:string){
        if (this.permanent) {
            localStorage.setItem('jwt', t);
        } else {
            sessionStorage.setItem('jwt', t);
        }
        // const nextDay = new Date(Date.now() + 24 * 3600 * 1000);
        // document.cookie = `jwt=${t}; expires=${nextDay.toUTCString()}`;
        this.token = t;
    }
    get val () {
        if (this.token) return this.token;
        const tmp = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
        return tmp || '';
    }
    public persist(b:boolean){
        this.permanent = b;
    }
    public clear(){
        this.token = '';
        localStorage.removeItem('jwt');
        sessionStorage.removeItem('jwt');
    }
}
const t = new Token();
export default t;
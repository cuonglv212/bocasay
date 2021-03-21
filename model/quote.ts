export default class Quote {
    quote_id: string;
    quote: string;
    author: string;
    series: string;

    constructor(data: any) {
        this.quote_id = data.quote_id || "",
            this.quote = data.quote || "",
            this.author = data.author || "",
            this.series = data.series || "",
    }
}
export default class Character {
    char_id: string;
    name: string;
    birthday: string;
    occupation: Array<string>[];
    img: string;
    status: string;
    nickname: string;
    appearance: Array<string>[];
    portrayed: string;
    category: string;
    better_call_saul_appearance: Array<number>[]
    constructor(data: any) {
        this.char_id = data.char_id || "",
            this.name = data.name || "",
            this.birthday = data.birthday || "",
            this.occupation = data.occupation || [],
            this.img = data.img || "",
            this.status = data.status || "",
            this.nickname = data.nickname || "",
            this.appearance = data.appearance || [],
            this.portrayed = data.portrayed || "",
            this.category = data.category || "",
            this.better_call_saul_appearance = data.better_call_saul_appearance || []
    }
}
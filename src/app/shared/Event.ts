export class Event {
    constructor(
        public id: number = 50,
        public name: string = '',
        public date: Date = new Date,
        public time: Date = new Date,
        public location: string = '',
        public capacity: number = 100,
        public ticketId: number = 25
    ) {}
}
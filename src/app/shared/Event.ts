export class Event {
    constructor(
        public id: number = -1,
        public name: string = '',
        public date: Date = new Date,
        public time: Date = new Date,
        public location: string = '',
        public capacity: number = -1,
        public ticketId: number = -1
    ) {}
}
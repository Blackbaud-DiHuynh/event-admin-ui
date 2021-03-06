import { Ticket } from './Ticket';
export class Event {
    constructor(
        public id: number = undefined,
        public name: string = undefined,
        public date: Date = new Date,
        public location: string = undefined,
        public capacity: number = undefined,
        public tickets: Ticket[] = [new Ticket()],
        public remainingInventory: number,
        public currentPrice: number,
        public basePrice: number
    ) {}
}
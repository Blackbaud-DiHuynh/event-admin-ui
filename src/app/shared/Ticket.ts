export class Ticket {
    constructor(
        public id: number = undefined,
        public basePrice: number = undefined,
        public eventId: number = undefined,
        public currentPrice: number = undefined,
    ) {}
}
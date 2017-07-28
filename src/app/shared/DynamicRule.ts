export class DynamicRule {
    constructor(
        public id: number = undefined,
        public priceChange: number = 0,
        public ticketId: number = undefined,
        public inventoryThreshold: number = 0,
        public percentSoldThreshold: number = 0,
        public type: string = 'CAPACITY',
    ) {}
}
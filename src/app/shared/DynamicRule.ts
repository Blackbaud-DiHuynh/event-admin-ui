export class DynamicRule {
    constructor(
        public id: number = undefined,
        public priceChange: number = undefined,
        public ticketId: number = undefined,
        public inventoryThreshold: number = undefined,
        public percentSoldThreshold: number = undefined,
        public type: string = 'CAPACITY',
    ) {}
}
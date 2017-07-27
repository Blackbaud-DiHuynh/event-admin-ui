import { Component } from '@angular/core';
import { ListSortFieldSelectorModel } from '@blackbaud/skyux/dist/core';

@Component({
    selector: 'event-grid',
    templateUrl: './event-grid.component.html'
})
export class SkyGridDemoComponent {
    public items: any[] = [
        { id: '1', name: 101, location: 'Apple', date: 'Anne eats apples', remainingTickets: 'Comp A', ticketsSold: '1800', price: '$50.00'},
        { id: '2', name: 202, location: 'Banana', date: 'Ben eats bananas', remainingTickets: 'Comp B', ticketsSold: '1800', price: '$50.00'},
        { id: '3', name: 303, location: 'Pear', date: 'Patty eats pears', remainingTickets: 'Comp C', ticketsSold: '1800', price: '$50.00'},
        { id: '4', name: 404, location: 'Grape', date: 'George eats grapes', remainingTickets: 'Comp D', ticketsSold: '1800', price: '$50.00'},
        { id: '5', name: 505, location: 'Banana', date: 'Becky eats bananas',
            remainingTickets: 'Comp E', ticketsSold: '1800', price: '$50.00'},
        { id: '6', name: 606, location: 'Lemon', date: 'Larry eats lemons', remainingTickets: 'Comp F', ticketsSold: '1800', price: '$50.00'},
        { id: '7', name: 707, location: 'Strawberry', date: 'Sally eats strawberries',
            remainingTickets: 'Comp G', ticketsSold: '1800', price: '$50.00'}
    ];

    public sortChanged(activeSort: ListSortFieldSelectorModel) {
        let sortField = activeSort.fieldSelector;
        let descending = activeSort.descending;
        this.items = this.items.sort((a: any, b: any) => {
            let value1 = a[sortField];
            let value2 = b[sortField];

            if (value1 && typeof value1 === 'string') {
                value1 = value1.toLowerCase();
            }

            if (value2 && typeof value2 === 'string') {
                value2 = value2.toLowerCase();
            }
            if (value1 === value2) {
                return 0;
            }

            let result = value1 > value2 ? 1 : -1;

            if (descending) {
                result *= -1;
            }
            return result;
        }).slice();
    }
}
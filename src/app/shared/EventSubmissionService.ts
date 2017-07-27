import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { OperationResult } from './operation-result';
import { Operation } from './operation';
import { OperationStatus } from './operation-status';

@Injectable()
export class EventSubmissionService {
  private statusChange = new Subject<OperationResult>();
  private _result = this.statusChange.asObservable();

  public success (operation: Operation) {
    this.statusChange.next(new OperationResult(operation, OperationStatus.SUCCESS));
  }

  public failure (operation: Operation) {
    this.statusChange.next((new OperationResult(operation, OperationStatus.FAIL)));
  }

  get result(): Observable<OperationResult> {
    return this._result;
  }
}

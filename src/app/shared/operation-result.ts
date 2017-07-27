import {Operation} from './operation';
import {OperationStatus} from './operation-status';

export class OperationResult {
  constructor(
    public operation: Operation,
    public status: OperationStatus
  ) {}

}

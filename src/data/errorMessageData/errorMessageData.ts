import {errorMessageObject} from '../../models/errorMessageModels';

export const errorMessagesData: errorMessageObject  = {
  genericError: {status: 500, message:'oops, something went wrong!'},
  // empty/incomplete
  // invalid
  invalidParametersForLaunchesList: {status: 400, message: 'Invalid search parameters. Please, if you provide a parameter, it must be a valid one. Optional parameters that can be provided: page (number), limit (number).'},
  // successful
  // database errors
  ER_DUP_ENTRY_FOR_POPULATING_ROCKETS_TABLE: {message:'duplicated entry for rockets table.'},
  // Table errors
  ROCKETS_TABLE_ALREADY_EXISTS: {message: 'createRocketsTable: failure to created new table (table already exists). Proceeding to next task...'},
  LAUNCHES_TABLE_ALREADY_EXISTS: {message: 'createLaunchesTable: failure to created new table (table already exists). Proceeding to next task...'},
  // Populate errors
  EMPTY_RESPONSE_FOR_ROCKETS_NAME_DATA_GRAB: {message: 'populateRocketsTable: request returned empty. Third-party API may be offline.'}
};
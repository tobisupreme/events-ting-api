/// https://github.com/prisma/prisma/issues/18871#issuecomment-1703752412
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// class BaseError extends PrismaClientKnownRequestError {
//     constructor(error: PrismaClientKnownRequestError) {
//         super(error.message, {
//             code: error.code,
//             clientVersion: error.clientVersion,
//             meta: error.meta,
//             batchRequestIdx: error.batchRequestIdx,
//         });
//     }
// }

// export class PrismaAuthenticationFailedError extends BaseError {
//     code = 'P1000';
// }

// export class PrismaDatabaseUnreachableError extends BaseError {
//     code = 'P1001';
// }

// export class PrismaDatabaseTimeoutError extends BaseError {
//     code = 'P1002';
// }

// export class PrismaDatabaseDoesNotExistError extends BaseError {
//     code = 'P1003';
// }

// export class PrismaOperationTimeoutError extends BaseError {
//     code = 'P1008';
// }

// export class PrismaDatabaseAlreadyExistsError extends BaseError {
//     code = 'P1009';
// }

// export class PrismaUserAccessDeniedError extends BaseError {
//     code = 'P1010';
// }

// export class PrismaTlsConnectionError extends BaseError {
//     code = 'P1011';
// }

// export class PrismaSchemaValidationError extends BaseError {
//     code = 'P1012';
// }

// export class PrismaInvalidDatabaseStringError extends BaseError {
//     code = 'P1013';
// }

// export class PrismaUnderlyingModelError extends BaseError {
//     code = 'P1014';
// }

// export class PrismaUnsupportedDatabaseVersionError extends BaseError {
//     code = 'P1015';
// }

// export class PrismaIncorrectParametersError extends BaseError {
//     code = 'P1016';
// }

// export class PrismaServerClosedConnectionError extends BaseError {
//     code = 'P1017';
// }

// export class PrismaValueTooLongError extends BaseError {
//     code = 'P2000';
// }

// export class PrismaRecordDoesNotExistError extends BaseError {
//     code = 'P2001';
// }

// export class PrismaUniqueConstraintError extends BaseError {
//     code = 'P2002';
// }

// export class PrismaForeignKeyConstraintError extends BaseError {
//     code = 'P2003';
// }

// export class PrismaDatabaseConstraintError extends BaseError {
//     code = 'P2004';
// }

// export class PrismaInvalidFieldValueError extends BaseError {
//     code = 'P2005';
// }

// export class PrismaInvalidValueError extends BaseError {
//     code = 'P2006';
// }

// export class PrismaDataValidationError extends BaseError {
//     code = 'P2007';
// }

// export class PrismaQueryParsingError extends BaseError {
//     code = 'P2008';
// }

// export class PrismaQueryValidationError extends BaseError {
//     code = 'P2009';
// }

// export class PrismaRawQueryFailedError extends BaseError {
//     code = 'P2010';
// }

// export class PrismaNullConstraintViolationError extends BaseError {
//     code = 'P2011';
// }

// export class PrismaMissingRequiredValueError extends BaseError {
//     code = 'P2012';
// }

// export class PrismaMissingRequiredArgumentError extends BaseError {
//     code = 'P2013';
// }

// export class PrismaRelationViolationError extends BaseError {
//     code = 'P2014';
// }

// export class PrismaRelatedRecordNotFoundError extends BaseError {
//     code = 'P2015';
// }

// export class PrismaQueryInterpretationError extends BaseError {
//     code = 'P2016';
// }

// export class PrismaRecordsNotConnectedError extends BaseError {
//     code = 'P2017';
// }

// export class PrismaConnectedRecordsNotFoundError extends BaseError {
//     code = 'P2018';
// }

// export class PrismaInputError extends BaseError {
//     code = 'P2019';
// }

// export class PrismaValueOutOfRangeError extends BaseError {
//     code = 'P2020';
// }

// export class PrismaTableDoesNotExistError extends BaseError {
//     code = 'P2021';
// }

// export class PrismaColumnDoesNotExistError extends BaseError {
//     code = 'P2022';
// }

// export class PrismaInconsistentColumnDataError extends BaseError {
//     code = 'P2023';
// }

// export class PrismaConnectionPoolTimeoutError extends BaseError {
//     code = 'P2024';
// }

// export class PrismaOperationFailedError extends BaseError {
//     code = 'P2025';
// }

// export class PrismaUnsupportedFeatureError extends BaseError {
//     code = 'P2026';
// }

// export class PrismaDatabaseQueryExecutionErrors extends BaseError {
//     code = 'P2027';
// }

// export class PrismaTransactionApiError extends BaseError {
//     code = 'P2028';
// }

// export class PrismaFulltextIndexNotFoundError extends BaseError {
//     code = 'P2030';
// }

// export class PrismaMongoDBReplicaSetError extends BaseError {
//     code = 'P2031';
// }

// export class PrismaNumberOutOfRangeError extends BaseError {
//     code = 'P2033';
// }

// export class PrismaTransactionConflictError extends BaseError {
//     code = 'P2034';
// }

// export class PrismaDatabaseCreationFailedError extends BaseError {
//     code = 'P3000';
// }

// export class PrismaMigrationDestructiveChangesError extends BaseError {
//     code = 'P3001';
// }

// export class PrismaMigrationRollbackError extends BaseError {
//     code = 'P3002';
// }

// export class PrismaMigrationFormatChangedError extends BaseError {
//     code = 'P3003';
// }

// export class PrismaSystemDatabaseAlterationError extends BaseError {
//     code = 'P3004';
// }

// export class PrismaNonEmptySchemaError extends BaseError {
//     code = 'P3005';
// }

// export class PrismaFailedMigrationError extends BaseError {
//     code = 'P3006';
// }

// export class PrismaPreviewFeaturesBlockedError extends BaseError {
//     code = 'P3007';
// }

// export class PrismaMigrationAlreadyAppliedError extends BaseError {
//     code = 'P3008';
// }

// export class PrismaFailedMigrationsError extends BaseError {
//     code = 'P3009';
// }

// export class PrismaMigrationNameTooLongError extends BaseError {
//     code = 'P3010';
// }

// export class PrismaMigrationNotFoundForRollbackError extends BaseError {
//     code = 'P3011';
// }

// export class PrismaMigrationNotInFailedStateError extends BaseError {
//     code = 'P3012';
// }

// export class PrismaProviderArraysNotSupportedError extends BaseError {
//     code = 'P3013';
// }

// export class PrismaShadowDatabaseCreationError extends BaseError {
//     code = 'P3014';
// }

// export class PrismaMigrationFileNotFoundError extends BaseError {
//     code = 'P3015';
// }

// export class PrismaDatabaseResetFallbackFailedError extends BaseError {
//     code = 'P3016';
// }

// export class PrismaMigrationNotFoundError extends BaseError {
//     code = 'P3017';
// }

// export class PrismaMigrationFailedToApplyError extends BaseError {
//     code = 'P3018';
// }

// export class PrismaProviderMismatchError extends BaseError {
//     code = 'P3019';
// }

// export class PrismaShadowDatabaseDisabledError extends BaseError {
//     code = 'P3020';
// }

// export class PrismaNoForeignKeysError extends BaseError {
//     code = 'P3021';
// }

// export class PrismaNoDirectDdlError extends BaseError {
//     code = 'P3022';
// }

// export class PrismaIntrospectionFailedError extends BaseError {
//     code = 'P4000';
// }

// export class PrismaEmptyIntrospectedDatabaseError extends BaseError {
//     code = 'P4001';
// }

// export class PrismaInconsistentIntrospectedSchemaError extends BaseError {
//     code = 'P4002';
// }

// export class PrismaDataProxyRequestError extends BaseError {
//     code = 'P5000';
// }

// export class PrismaDataProxyRetryRequestError extends BaseError {
//     code = 'P5001';
// }

// export class PrismaDataProxyInvalidDatasourceError extends BaseError {
//     code = 'P5002';
// }

// export class PrismaDataProxyResourceNotFoundError extends BaseError {
//     code = 'P5003';
// }

// export class PrismaDataProxyFeatureNotImplementedError extends BaseError {
//     code = 'P5004';
// }

// export class PrismaDataProxySchemaUploadError extends BaseError {
//     code = 'P5005';
// }

// export class PrismaDataProxyUnknownServerError extends BaseError {
//     code = 'P5006';
// }

// export class PrismaDataProxyUnauthorizedError extends BaseError {
//     code = 'P5007';
// }

// export class PrismaDataProxyUsageExceededError extends BaseError {
//     code = 'P5008';
// }

// export class PrismaDataProxyRequestTimeoutError extends BaseError {
//     code = 'P5009';
// }

// export class PrismaDataProxyFetchError extends BaseError {
//     code = 'P5010';
// }

// export class PrismaDataProxyInvalidRequestParametersError extends BaseError {
//     code = 'P5011';
// }

// export class PrismaDataProxyUnsupportedEngineVersionError extends BaseError {
//     code = 'P5012';
// }

// export class PrismaDataProxyEngineStartupError extends BaseError {
//     code = 'P5013';
// }

// export class PrismaDataProxyUnknownEngineStartupError extends BaseError {
//     code = 'P5014';
// }

// export class PrismaDataProxyInteractiveTransactionError extends BaseError {
//     code = 'P5015';
// }

export enum PrismaErrorCodes {
    PrismaAuthenticationFailedError = 'P1000',
    PrismaDatabaseUnreachableError = 'P1001',
    PrismaDatabaseTimeoutError = 'P1002',
    PrismaDatabaseDoesNotExistError = 'P1003',
    PrismaOperationTimeoutError = 'P1008',
    PrismaDatabaseAlreadyExistsError = 'P1009',
    PrismaUserAccessDeniedError = 'P1010',
    PrismaTlsConnectionError = 'P1011',
    PrismaSchemaValidationError = 'P1012',
    PrismaInvalidDatabaseStringError = 'P1013',
    PrismaUnderlyingModelError = 'P1014',
    PrismaUnsupportedDatabaseVersionError = 'P1015',
    PrismaIncorrectParametersError = 'P1016',
    PrismaServerClosedConnectionError = 'P1017',
    PrismaValueTooLongError = 'P2000',
    PrismaRecordDoesNotExistError = 'P2001',
    PrismaUniqueConstraintError = 'P2002',
    PrismaForeignKeyConstraintError = 'P2003',
    PrismaDatabaseConstraintError = 'P2004',
    PrismaInvalidFieldValueError = 'P2005',
    PrismaInvalidValueError = 'P2006',
    PrismaDataValidationError = 'P2007',
    PrismaQueryParsingError = 'P2008',
    PrismaQueryValidationError = 'P2009',
    PrismaRawQueryFailedError = 'P2010',
    PrismaNullConstraintViolationError = 'P2011',
    PrismaMissingRequiredValueError = 'P2012',
    PrismaMissingRequiredArgumentError = 'P2013',
    PrismaRelationViolationError = 'P2014',
    PrismaRelatedRecordNotFoundError = 'P2015',
    PrismaQueryInterpretationError = 'P2016',
    PrismaRecordsNotConnectedError = 'P2017',
    PrismaConnectedRecordsNotFoundError = 'P2018',
    PrismaInputError = 'P2019',
    PrismaValueOutOfRangeError = 'P2020',
    PrismaTableDoesNotExistError = 'P2021',
    PrismaColumnDoesNotExistError = 'P2022',
    PrismaInconsistentColumnDataError = 'P2023',
    PrismaConnectionPoolTimeoutError = 'P2024',
    PrismaOperationFailedError = 'P2025',
    PrismaUnsupportedFeatureError = 'P2026',
    PrismaDatabaseQueryExecutionErrors = 'P2027',
    PrismaTransactionApiError = 'P2028',
    PrismaFulltextIndexNotFoundError = 'P2030',
    PrismaMongoDBReplicaSetError = 'P2031',
    PrismaNumberOutOfRangeError = 'P2033',
    PrismaTransactionConflictError = 'P2034',
    PrismaDatabaseCreationFailedError = 'P3000',
    PrismaMigrationDestructiveChangesError = 'P3001',
    PrismaMigrationRollbackError = 'P3002',
    PrismaMigrationFormatChangedError = 'P3003',
    PrismaSystemDatabaseAlterationError = 'P3004',
    PrismaNonEmptySchemaError = 'P3005',
    PrismaFailedMigrationError = 'P3006',
    PrismaPreviewFeaturesBlockedError = 'P3007',
    PrismaMigrationAlreadyAppliedError = 'P3008',
    PrismaFailedMigrationsError = 'P3009',
    PrismaMigrationNameTooLongError = 'P3010',
    PrismaMigrationNotFoundForRollbackError = 'P3011',
    PrismaMigrationNotInFailedStateError = 'P3012',
    PrismaProviderArraysNotSupportedError = 'P3013',
    PrismaShadowDatabaseCreationError = 'P3014',
    PrismaMigrationFileNotFoundError = 'P3015',
    PrismaDatabaseResetFallbackFailedError = 'P3016',
    PrismaMigrationNotFoundError = 'P3017',
    PrismaMigrationFailedToApplyError = 'P3018',
    PrismaProviderMismatchError = 'P3019',
    PrismaShadowDatabaseDisabledError = 'P3020',
    PrismaNoForeignKeysError = 'P3021',
    PrismaNoDirectDdlError = 'P3022',
    PrismaIntrospectionFailedError = 'P4000',
    PrismaEmptyIntrospectedDatabaseError = 'P4001',
    PrismaInconsistentIntrospectedSchemaError = 'P4002',
    PrismaDataProxyRequestError = 'P5000',
    PrismaDataProxyRetryRequestError = 'P5001',
    PrismaDataProxyInvalidDatasourceError = 'P5002',
    PrismaDataProxyResourceNotFoundError = 'P5003',
    PrismaDataProxyFeatureNotImplementedError = 'P5004',
    PrismaDataProxySchemaUploadError = 'P5005',
    PrismaDataProxyUnknownServerError = 'P5006',
    PrismaDataProxyUnauthorizedError = 'P5007',
    PrismaDataProxyUsageExceededError = 'P5008',
    PrismaDataProxyRequestTimeoutError = 'P5009',
    PrismaDataProxyFetchError = 'P5010',
    PrismaDataProxyInvalidRequestParametersError = 'P5011',
    PrismaDataProxyUnsupportedEngineVersionError = 'P5012',
    PrismaDataProxyEngineStartupError = 'P5013',
    PrismaDataProxyUnknownEngineStartupError = 'P5014',
    PrismaDataProxyInteractiveTransactionError = 'P5015',
}

// type ErrorCode = keyof typeof errorCodeEnum;

// export function toTypedPrismaError(error: any) {
//     if (!(error instanceof PrismaClientKnownRequestError)) {
//         return null;
//     }
//     const code: ErrorCode = error.code as ErrorCode;
//     const ErrorClass = errorCodeEnum[code];
//     if (!ErrorClass) {
//         return null;
//     }
//     return new ErrorClass(error);
// }

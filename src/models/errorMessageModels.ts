export interface errorMessageObject {
    [key: string]: errorMessage | externalErrorMessage
}
export interface errorMessage {
    message: string
}
export interface externalErrorMessage extends errorMessage{
    status: number
}
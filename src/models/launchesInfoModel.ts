export interface launchesRequestParameters {
    limit: number,
    search: string,
    offSet: number,
    page: number
}

export interface launchesStats {
    success: number,
    failures: number,
    total: number
}
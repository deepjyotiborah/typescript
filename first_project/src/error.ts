function generateError(errorMessage: string, code: number): never {
    throw{message: errorMessage, errorCode: code}
}

generateError(" An error occured", 500);
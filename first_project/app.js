function generateError(errorMessage, code) {
    throw { message: errorMessage, errorCode: code };
}
generateError(" An error occured", 500);

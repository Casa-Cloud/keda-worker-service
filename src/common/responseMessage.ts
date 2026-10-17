export class ResponseMessage {
  public responseError = async (
    req: any,
    res: any,
    statusCode: any,
    message: any,
    error: any,
    details: any,
    errorcode: any,
    requestId: any) => {
    try {
      res.locals.logger.info("ResponseMessage - responseError",
        { requestId: res.locals.requestId });
      return res.status(statusCode).json({
        message,
        error,
        details,
        errorcode,
        requestId
      });
    } catch (errorresponseError) {
      res.locals.logger.error("ResponseMessage - responseError",
        { errorresponseError, requestId: res.locals.requestId });
    }
  }

  public responseSuccess = async (
    req: any,
    res: any,
    statusCode: any,
    message: any,
    details: any,
    requestId: any) => {
    try {
      res.locals.logger.info("ResponseMessage - responseSuccess",
        { requestId: res.locals.requestId });
      return res.status(statusCode).json({
        message,
        details,
        requestId
      });
    } catch (error) {
      res.locals.logger.error("ResponseMessage - responseSuccess",
        { error, requestId: res.locals.requestId });
    }
  }
}

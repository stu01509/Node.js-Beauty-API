class ExtendableError extends Error {
  constructor(message, code, detailMessage) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.message = message;
    this.detailMessage = detailMessage;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

class NoFound extends ExtendableError {
  constructor(detailMessage) {
    super(detailMessage);
    this.name = 'NoFound';
    this.code = '404';
    this.message = 'Not found';
    this.detailMessage = detailMessage;
  }
}

class QueryError extends ExtendableError {
  constructor(detailMessage) {
    super(detailMessage);
    this.name = 'QueryError';
    this.code = '400';
    this.message = 'Query Error';
    this.detailMessage = detailMessage;
  }
}

class ServerError extends ExtendableError {
  constructor(detailMessage) {
    super(detailMessage);
    this.name = 'ServerError';
    this.code = '500';
    this.message = 'Server Error';
    this.detailMessage = detailMessage;
  }
}

class DBError extends ExtendableError {
  constructor(detailMessage) {
    super(detailMessage);
    this.name = 'DBError';
    this.code = '500';
    this.message = 'DB Error';
    this.detailMessage = detailMessage;
  }
}

module.exports = {
  NoFound,
  QueryError,
  DBError,
  ServerError,
};

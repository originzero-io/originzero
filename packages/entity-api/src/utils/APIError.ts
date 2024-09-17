class APIError extends Error {
  status: number | null;

  code?: number;

  constructor(message: string, status: number | null, code?: number) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export default APIError;

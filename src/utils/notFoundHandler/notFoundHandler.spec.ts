import { NextFunction, Request, Response } from 'express';
import { notFoundHandler } from '.';

describe('Not found handler middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();
  const sendMockFunction = jest.fn();
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockImplementation((_: number) => ({ send: sendMockFunction })),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 code', () => {
    // Act
    notFoundHandler(mockRequest as Request, mockResponse as Response, nextFunction);
    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(sendMockFunction).toBeCalledWith({
      message: 'Not found',
    });
  });
});

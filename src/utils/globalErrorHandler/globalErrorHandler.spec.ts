import { NextFunction, Request, Response } from 'express';
import { globalErrorHandler } from '.';
import { AppError, StatusCodes } from '../../components/core';

describe('Global error handler middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();
  const jsonMockFunction = jest.fn();
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockImplementation((_: number) => ({ json: jsonMockFunction })),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return custom status code', () => {
    // Arrange
    const error = new AppError(404, StatusCodes.NOT_FOUND, 'not found');
    // Act
    globalErrorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);
    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(error.statusCode);
    expect(jsonMockFunction).toBeCalledWith({
      code: error.codeString,
      message: error.message,
    });
  });

  it('should return code 500', () => {
    // Arrange
    const error = new Error('Some errors');
    // Act
    globalErrorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);
    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(jsonMockFunction).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});

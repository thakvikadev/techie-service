import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
export type CreatedModel = {
  id: string;
  created: boolean;
};
type ErrorModel = {
  error: {
    code: string | number;
    traceId: string;
    message: string;
    timestamp: string;
    path: string;
  };
};
type SwaggerError = {
  status: number;
  route: string;
  message?: string | unknown;
  description?: string;
};

type SwaggerText = {
  status: number;
  text: string | unknown;
  description?: string;
};

type SwaggerJSON = {
  status: number;
  json: unknown;
  description?: string;
};

export const Swagger = {
  defaultResponseError({
    status,
    route,
    message,
    description,
  }: SwaggerError): ApiResponseOptions {
    return {
      schema: {
        example: {
          error: {
            code: status,
            traceId: '<traceId>',
            message: [message, HttpStatus[String(status)]].find(Boolean),
            timestamp: '<timestamp>',
            path: route,
          },
        } as ErrorModel,
      },
      description,
      status,
    };
  },

  defaultResponseText({
    status,
    text,
    description,
  }: SwaggerText): ApiResponseOptions {
    return {
      content: {
        'text/plain': {
          schema: {
            example: text,
          },
        },
      },
      description,
      status,
    };
  },

  defaultResponseJSON({
    status,
    json,
    description,
  }: SwaggerJSON): ApiResponseOptions {
    return {
      content: {
        'application/json': {
          schema: {
            example: json,
          },
        },
      },
      description,
      status,
    };
  },

  defaultRequestJSON(json: any): ApiResponseOptions {
    return {
      schema: {
        properties: Object.keys(json).reduce((acc, key) => {
          acc[key] = { type: typeof json[key] };
          return acc;
        }, {}),
      },
    };
  },
};

export const SwaggerResponse = {
  save: {
    201: Swagger.defaultResponseJSON({
      json: { id: '<id>', created: true } as CreatedModel,
      status: 201,
      description: 'save successfully',
    }),
    401: Swagger.defaultResponseError({
      status: 401,
      route: 'api/user',
      description: 'unauthorized',
    }),
    500: Swagger.defaultResponseError({
      status: 500,
      route: 'api/users',
      description: 'save unsuccessfully',
    }),
  },
};

export class SwaggerRequest {
  static requestBody(requestClass: new () => any): Record<string, any> {
    const instance = new requestClass();
    const properties = Object.entries(instance).reduce((acc, [key, value]) => {
      acc[key] = { type: SwaggerRequest.inferType(value) };
      return acc;
    }, {});
    return { type: 'object', properties };
  }

  private static inferType(value: any): string {
    switch (typeof value) {
      case 'number':
        return Number.isInteger(value) ? 'integer' : 'number';
      case 'boolean':
        return 'boolean';
      case 'string':
        return 'string';
      case 'object':
        return Array.isArray(value) ? 'array' : value ? 'object' : 'string';
      default:
        return 'string';
    }
  }
}

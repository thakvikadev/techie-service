import { Auth, Scopes, SignatureGuard, sign } from '@ababank/auth';
import { Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { baseString } from '@utility/signature.utility';
import { Request } from 'express';
import { readFileSync } from 'fs';

@Controller({ version: '1', path: 'users' })
@UseGuards(SignatureGuard)
export class UserController {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  @Get()
  @Scopes('profile_lite', 'id')
  index(@Auth() user: any): Promise<any> {
    const url = `${this.request.get('host')}${this.request.originalUrl}`;
    const verifiableData = `${baseString({
      method: this.request.method,
      url: url,
      body: this.request.body,
      query: this.request.query,
      nonce: this.request.get('x-nonce'),
    })}`;
    const signed = sign(
      verifiableData,
      readFileSync('.ssh/id_rsa').toString(),
      'Admin@123',
    );
    return Promise.resolve({
      object: {
        method: this.request.method,
        url: url,
        body: this.request.body,
        query: this.request.query,
        nonce: this.request.get('x-nonce'),
      },
      verifiableData,
      signed,
      user: user,
    });
  }

  @Post()
  @Scopes('profile_details', 'id')
  update(): Promise<any> {
    return Promise.resolve({ user: 'user' });
  }
}

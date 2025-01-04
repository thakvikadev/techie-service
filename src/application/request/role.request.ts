import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  module: string;

  @IsArray()
  @IsOptional()
  permissions: number[];
}

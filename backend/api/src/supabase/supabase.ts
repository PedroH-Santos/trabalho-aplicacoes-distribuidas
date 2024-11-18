import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ExtractJwt } from 'passport-jwt';

@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private readonly logger = new Logger(Supabase.name);
  private clientInstance: SupabaseClient;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService,
  ) {}

  getClient() {
    this.logger.log('Getting Supabase client...');
    if (this.clientInstance) {
      this.logger.log('Client exists - returning for current Scope.REQUEST');
      return this.clientInstance;
    }

    this.logger.log('Initializing new Supabase client for new Scope.REQUEST');

    this.clientInstance = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_ANON_KEY'),
    );

    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(this.request);
    const refreshToken = this.request.headers['x-refresh-token'] as string;

    if (accessToken && refreshToken) {
      this.clientInstance.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
      this.logger.log('Auth has been set with the provided access and refresh tokens!');
    } else {
      this.logger.warn('Access token or refresh token not found in request headers');
    }

    return this.clientInstance;
  }
}

import { z } from 'zod';

import { ApiSector } from '@/lib/sector';
import { generateCommand } from '@/utils/generate-command';

/**
 * Vault token auth method
 *
 * @link https://developer.hashicorp.com/vault/api-docs/auth/token
 */
export class TokenMethod extends ApiSector {
  /**
   * List accessors
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#list-accessors
   */
  get accessors() {
    return generateCommand({
      method: 'LIST',
      path: '/auth/token/accessors',
      client: this.client,
      schema: {
        response: z.object({
          auth: z.any(),
          warnings: z.any(),
          wrap_info: z.any(),
          data: z.object({
            keys: z.array(z.string())
          }),
          lease_duration: z.number(),
          renewable: z.boolean(),
          lease_id: z.string()
        })
      }
    });
  }

  /**
   * Create token
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#create-token
   */
  get create() {
    return generateCommand({
      method: 'POST',
      path: '/auth/token/create',
      client: this.client,
      schema: {
        body: z.object({
          id: z.string().optional(),
          role_name: z.string().optional(),
          policies: z.array(z.string()).optional(),
          meta: z.record(z.string(), z.string()).optional(),
          no_parent: z.boolean().optional(),
          no_default_policy: z.boolean().optional(),
          renewable: z.boolean().default(true),
          lease: z.string().optional(), // Deprecated
          ttl: z.string().optional(),
          type: z.string().optional(),
          explicit_max_ttl: z.string().optional(),
          display_name: z.string().default('token'),
          num_uses: z.number().int().optional(),
          period: z.string().optional(),
          entity_alias: z.string().optional()
        }),
        response: z.object({
          request_id: z.string(),
          lease_id: z.string().nullable(),
          renewable: z.boolean(),
          lease_duration: z.number(),
          data: z.any().nullable(), // `data` can be `null`
          wrap_info: z.any().nullable(),
          warnings: z.array(z.string()).nullable(),
          auth: z
            .object({
              client_token: z.string(),
              accessor: z.string(),
              policies: z.array(z.string()),
              token_policies: z.array(z.string()),
              metadata: z.record(z.string(), z.string()).nullable(),
              lease_duration: z.number(),
              renewable: z.boolean(),
              entity_id: z.string(),
              token_type: z.string(),
              orphan: z.boolean(),
              num_uses: z.number()
            })
            .nullable()
            .default(null)
        })
      }
    });
  }

  /**
   * Revoke token and orphan children
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#revoke-token-and-orphan-children
   */
  get revoke() {
    return generateCommand({
      method: 'POST',
      path: '/auth/token/revoke-orphan',
      client: this.client,
      schema: {
        body: z.object({
          token: z.string()
        })
      }
    });
  }

  /**
   * Lookup a token
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#lookup-a-token
   */
  get lookup() {
    return generateCommand({
      method: 'POST',
      path: '/auth/token/lookup',
      client: this.client,
      schema: {
        body: z.object({
          token: z.string()
        }),
        response: z.object({
          data: z.object({
            accessor: z.string(),
            creation_time: z.number(),
            creation_ttl: z.number(),
            display_name: z.string(),
            entity_id: z.string(),
            expire_time: z.string().optional(),
            explicit_max_ttl: z.number(),
            id: z.string(),
            identity_policies: z.array(z.string()).optional(),
            issue_time: z.string().optional(),
            meta: z.object({
              username: z.string()
            }).optional(),
            num_uses: z.number(),
            orphan: z.boolean(),
            path: z.string(),
            policies: z.array(z.string()),
            renewable: z.boolean().optional(),
            ttl: z.number()
          })
        })
      }
    });
  }
}

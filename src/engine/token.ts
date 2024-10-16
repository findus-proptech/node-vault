import { z } from 'zod';

import { ApiSector } from '@/lib/sector';
import { generateCommand } from '@/utils/generate-command';

/**
 * Vault token auth method
 *
 * @link https://developer.hashicorp.com/vault/api-docs/secret/kubernetes
 */
export class Token extends ApiSector {
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
          warnings: z.array(z.string()),
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
}

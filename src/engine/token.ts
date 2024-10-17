import { z } from 'zod';

import { ApiSector } from '@/lib/sector';
import { generateCommand } from '@/utils/generate-command';

/**
 * Vault token auth method
 *
 * @link https://developer.hashicorp.com/vault/api-docs/auth/token
 */
export class Tokens extends ApiSector {
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
            expire_time: z.string().nullable(),
            explicit_max_ttl: z.number(),
            id: z.string(),
            identity_policies: z.array(z.string()).optional(),
            issue_time: z.string().optional(),
            meta: z
              .object({
                username: z.string()
              })
              .nullable(),
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

  /**
   * Lookup a token (Self)
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#lookup-a-token-self
   */
  get lookupSelf() {
    return generateCommand({
      method: 'GET',
      path: '/auth/token/lookup-self',
      client: this.client,
      schema: {
        response: z.object({
          data: z.object({
            accessor: z.string(),
            creation_time: z.number(),
            creation_ttl: z.number(),
            display_name: z.string(),
            entity_id: z.string(),
            expire_time: z.string().nullable(),
            explicit_max_ttl: z.number(),
            id: z.string(),
            identity_policies: z.array(z.string()).optional(),
            issue_time: z.string().optional(),
            meta: z
              .object({
                username: z.string()
              })
              .nullable(),
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

  /**
   * Lookup a token (Accessor)
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#lookup-a-token-accessor
   */
  get lookupAccessor() {
    return generateCommand({
      method: 'POST',
      path: '/auth/token/lookup-accessor',
      client: this.client,
      schema: {
        body: z.object({
          accessor: z.string()
        }),
        response: z.object({
          data: z.object({
            accessor: z.string(),
            creation_time: z.number(),
            creation_ttl: z.number(),
            display_name: z.string(),
            entity_id: z.string(),
            expire_time: z.string().nullable(),
            explicit_max_ttl: z.number(),
            id: z.string(),
            identity_policies: z.array(z.string()).optional(),
            issue_time: z.string().optional(),
            meta: z
              .object({
                username: z.string()
              })
              .nullable(),
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

  /**
   * Renew a token
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#renew-a-token
   */
  get renew() {
    return generateCommand({
      method: 'POST',
      path: '/auth/token/renew',
      client: this.client,
      schema: {
        body: z.object({
          token: z.string(),
          increment: z.string().optional()
        }),
        response: z.object({
          auth: z.object({
            client_token: z.string(),
            policies: z.array(z.string()).optional(),
            metadata: z.record(z.string(), z.string()).nullable(),
            lease_duration: z.number(),
            renewable: z.boolean()
          })
        })
      }
    });
  }

  /**
   * Renew a token (Self)
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#renew-a-token-self
   */
  get renewSelf() {
    return generateCommand({
      method: 'POST',
      path: '/auth/token/renew-self',
      client: this.client,
      schema: {
        body: z.object({
          increment: z.string().optional()
        }),
        response: z.object({
          auth: z.object({
            client_token: z.string(),
            policies: z.array(z.string()).optional(),
            metadata: z.record(z.string(), z.string()).nullable(),
            lease_duration: z.number(),
            renewable: z.boolean()
          })
        })
      }
    });
  }

  /**
   * Renew a token (Accessor)
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#renew-a-token-accessor
   */
  get renewAccessor() {
    return generateCommand({
      method: 'POST',
      path: '/auth/token/renew-accessor',
      client: this.client,
      schema: {
        body: z.object({
          accessor: z.string(),
          increment: z.string().optional()
        }),
        response: z.object({
          auth: z.object({
            client_token: z.string(),
            policies: z.array(z.string()).optional(),
            metadata: z.record(z.string(), z.string()).nullable(),
            lease_duration: z.number(),
            renewable: z.boolean()
          })
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
   * Revoke a token (Self)
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#revoke-a-token-self
   */
  get revokeSelf() {
    return generateCommand({
      method: 'POST',
      path: '/auth/token/revoke-self',
      client: this.client,
      schema: {}
    });
  }

  /**
   * Revoke a token accessor
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#revoke-a-token-accessor
   */
  get revokeAccessor() {
    return generateCommand({
      method: 'POST',
      path: '/auth/token/revoke-accessor',
      client: this.client,
      schema: {
        body: z.object({
          accessor: z.string()
        })
      }
    });
  }

  /**
   * Revoke a token and orphan children
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#revoke-token-and-orphan-children
   */
  get revokeOrphan() {
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
   * Read token role
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#read-token-role
   */
  get roleRead() {
    return generateCommand({
      method: 'GET',
      path: '/auth/token/roles/{{role_name}}',
      client: this.client,
      schema: {
        path: z.object({
          role_name: z.string()
        }),
        response: z.object({
          request_id: z.string(),
          lease_id: z.string().optional(),
          lease_duration: z.number(),
          renewable: z.boolean(),
          data: z.object({
            allowed_entity_aliases: z.array(z.string()),
            allowed_policies: z.array(z.string()),
            disallowed_policies: z.array(z.string()),
            allowed_policies_glob: z.array(z.string()),
            disallowed_policies_glob: z.array(z.string()),
            explicit_max_ttl: z.number(),
            name: z.string(),
            orphan: z.boolean(),
            path_suffix: z.string(),
            period: z.number(),
            renewable: z.boolean(),
            token_explicit_max_ttl: z.number(),
            token_no_default_policy: z.boolean(),
            token_period: z.number(),
            token_type: z.string()
          }),
          warnings: z.any().nullable()
        })
      }
    });
  }

  /**
   * List token role
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#list-token-roles
   */
  get roles() {
    return generateCommand({
      method: 'LIST',
      path: '/auth/token/roles',
      client: this.client,
      schema: {
        response: z.object({
          data: z.object({
            keys: z.array(z.string())
          }).optional()
        })
      }
    });
  }

  /**
   * Create/Update token role
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#create-update-token-role
   */
  get roleCreateUpdate() {
    return generateCommand({
      method: 'POST',
      path: '/auth/token/roles/{{role_name}}',
      client: this.client,
      schema: {
        path: z.object({
          role_name: z.string()
        }),
        body: z.object({
          name: z.string(),
          allowed_policies: z.array(z.string()).optional(),
          disallowed_policies: z.array(z.string()).optional(),
          allowed_policies_glob: z.array(z.string()).optional(),
          disallowed_policies_glob: z.array(z.string()).optional(),
          orphan: z.boolean().optional(),
          renewable: z.boolean().optional(),
          path_suffix: z.string().optional(),
          allowed_entity_aliases: z.union([z.string(), z.array(z.string())]).optional(),
          token_bound_cidrs: z.array(z.string()).optional(),
          token_explicit_max_ttl: z.union([z.number().nonnegative(), z.string()]).optional(),
          token_no_default_policy: z.boolean().optional(),
          token_num_uses: z.number().nonnegative().optional(),
          token_period: z.union([z.number().nonnegative(), z.string()]).optional(),
          token_type: z.string().optional()
        })
      }
    });
  }

  /**
   * Delete token role
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#delete-token-role
   */
  get roleDelete() {
    return generateCommand({
      method: 'DELETE',
      path: '/auth/token/roles/{{role_name}}',
      client: this.client,
      schema: {
        path: z.object({
          role_name: z.string()
        })
      }
    });
  }

  /**
   * Tidy tokens
   *
   * @link https://developer.hashicorp.com/vault/api-docs/auth/token#tidy-tokens
   */
  get tidy() {
    return generateCommand({
      method: 'POST',
      path: '/auth/token/tidy',
      client: this.client,
      schema: {}
    });
  }
}

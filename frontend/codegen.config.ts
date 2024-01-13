import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    // eslint-disable-next-line no-undef
    process.env.VITE_GQL_URL ?? '',
    './src/client.schema.graphql',
  ],
  documents: ['src/**/*{.tsx,ts}'],
  overwrite: true,
  generates: {
    './src/__generated__/graphql.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable @typescript-eslint/no-explicit-any */',
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'typescript-apollo-client-helpers',
      ],
      config: {
        gqlTagName: 'gql',
        withHooks: true,
        withHOC: false,
        withComponent: false,
        reactApolloVersion: 3,
        apolloReactHooksImportFrom: '@apollo/client',
        scalars: {
          DateTime: 'string',
          BigInt: 'string',
        },
        maybeValue: 'T',
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;

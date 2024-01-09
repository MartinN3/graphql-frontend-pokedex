import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    // eslint-disable-next-line no-undef
    process.env.VITE_GQL_URL ?? '',
  ],
  documents: ['src/**/*.tsx'],
  overwrite: true,
  generates: {
    './src/__generated__/graphql.ts': {
      plugins: [
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
};

export default config;

// import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "http://localhost:4000/graphql",
//   documents: "src/app/graphql/**/*.graphql",
//   generates: {
//     "src/app/graphql/gql/": {
//       preset: "client",
//       plugins: [
//         "typescript", "typescript-operations", "typescript-urql"
//       ]
//     }
//   }
// };

// export default config;

import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "http://localhost:4000/graphql",
//   documents: "src/app/graphql/**/*.graphql",
//   generates: {
//     "src/app/graphql/gql/": {
//       // preset: "client",
//       plugins: [
//         { typescript: {} },
//         { "typescript-operations": {} },
//         { "typescript-urql": {} }
//       ]
//     }
//   }
// };

// export default config;


const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/app/graphql/**/*.graphql",
  generates: {
    "src/app/graphql/gql/": {
      preset: "client",
      plugins: [
        "typescript-urql"
      ],
      config: {
        documentVariableSuffix: 'test2'
      }
    }
  }
};
export default config;
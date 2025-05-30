const { execSync } = require('child_process');

const collectPromisesResults = (callback) => async (prevValues) => {
  const results = await callback(prevValues);

  return { ...prevValues, ...results };
};
module.exports = {
  prompt: async ({ prompter, args }) => {
    if (Object.keys(args).length) {
      return Promise.resolve({
        name: args.name,
        idType: args.idType,
      });
    }

    const result = await prompter
      .prompt({
        type: 'input',
        name: 'name',
        message: "Entity name (e.g. 'User')",
        validate: (input) => {
          if (!input.trim()) {
            return 'Entity name is required';
          }

          return true;
        },
        format: (input) => {
          return input.trim();
        },
      })
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: 'input',
            name: 'idType',
            message: "Type of Id (e.g. 'increment', 'uuid', 'string')",
            initial: 'uuid',
            validate: (input) => {
              if (!input.trim()) {
                return 'Property idType is required';
              }

              return true;
            },
            format: (input) => {
              return input.trim();
            },
          });
        }),
      )
      
    if (!result.idType) {
      result.idType = 'uuid';
    }

    
      execSync(
        `npm run generate:resource:relational -- --name ${result.name} --idType ${result.idType}`,
        {
          stdio: 'inherit',
        },
      );

    return result;
  },
};

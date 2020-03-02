const orValue = (joi) => {
    return {
      type: 'object',
      base: joi.object(),
      messages: {
        orValue: '{{#label}} at least one option must be selected'
      },
      rules: {
        orValue: {
          multi: true, // Rule supports multiple invocations
          method(...q) {
            return this.$_addRule({ name: 'orValue', args: { q } });
          },
          args: [
            {
              name: 'q',
              ref: true,
              assert: (value) => typeof value === 'object',
              message: 'must be object'
            }
          ],
          validate(value, helpers, args) {
            const valid = args.q.some((key) => { 
              return value[key];
            });

            if (valid) {
              return value; // Value is valid
            }

            return helpers.error(
              'orValue',
              { q: args.q },
              null,
              Object.assign(helpers.state, {
                path: helpers.state.path.concat('*') // must do this because of UI
              })
            );
          }
        }
      }
    };
  };

  module.exports = orValue;
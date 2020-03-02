```
const orValue = require('./index');
const Joi = require('@hapi/joi').extend(orValue);

const schema = Joi.object({ hello : Joi.object().keys({ a: Joi.number(), b: Joi.number() }).orValue('a', 'b') });

try {
    Joi.assert({ hello: { a: 0, b: 0 } }, schema, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
      context: { hasAnyContactRentalStatus: true }
    });
  } catch (err) {
  if (err && err.isJoi) {
    console.log(err.details);
  } else {
    console.log(err);
  }
}
```
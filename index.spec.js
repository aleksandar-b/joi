
const orValue = require('./index');

const Joi = require('@hapi/joi').extend(orValue);
const { expect } = require('chai')

describe('orValue', function () {
  const schema = Joi.object({ hello : Joi.object().keys({ a: Joi.number(), b: Joi.number() }).orValue('a', 'b') };

    it('should fail if a and b are not thruthy', function () {
      expect(Joi.attempt({ hello: { a: 0, b: 0, f: 4 } }, schema)).to.throw(/'"hello.*" at least one option must be selected'/);
    })
});
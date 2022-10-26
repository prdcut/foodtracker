import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import messages from 'vee-validate/dist/locale/en.json';

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule],
  });
});

extend('password', {
  message: () =>
    `The password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and one special character`,
  validate: (value) => {
    var strongRegex = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+*!=])'
    );
    return strongRegex.test(value);
  },
});

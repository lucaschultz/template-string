import TemplateString from '../src/index';

describe('Testing TemplateString', () => {
  test('Filling a TemplateString with one unique placeholder', () => {
    const tString = new TemplateString('Hello ${greet}!');
    expect(tString.fill({ greet: 'World' })).toBe('Hello World!');
  });

  test('Filling a TemplateString with two unique placeholders', () => {
    const tString = new TemplateString('Hello ${greet}! My name is ${name}.');
    expect(tString.fill({ greet: 'World', name: 'Luca' })).toBe(
      'Hello World! My name is Luca.'
    );
  });

  test('Filling a TemplateString with one placeholder used several times', () => {
    const tString = new TemplateString(
      'Hello ${greet}! Wait, are you really ${greet}?'
    );
    expect(tString.fill({ greet: 'World' })).toBe(
      'Hello World! Wait, are you really World?'
    );
  });

  test('Filling a TemplateString with one placeholder used several times', () => {
    const tString = new TemplateString(
      'Hello ${greet}! Wait, are you really ${greet}?'
    );
    expect(tString.fill({ greet: 'World' })).toBe(
      'Hello World! Wait, are you really World?'
    );
  });

  test('Filling a TemplateString with one placeholder used correctly once and once without closing delimiter', () => {
    const tString = new TemplateString(
      'Hello ${greet}! Wait, are you really ${greet?'
    );
    expect(tString.fill({ greet: 'World' })).toBe(
      'Hello World! Wait, are you really ${greet?'
    );
  });

  test('Calling the `fill` method on an TemplateString instanciated with `undefined` yields `undefined`', () => {
    const tString = new TemplateString(undefined as unknown as string);
    expect(tString.fill({ does: 'not exist' })).toBeUndefined;
  });

  test('Calling the `fill` method with `undefined` yields `undefined`', () => {
    const tString = new TemplateString('Valid ${template} string!');
    expect(tString.fill(undefined as unknown as any)).toBeUndefined;
  });
});

# Template Strings

Conveniently typed string templates with a syntax **heavily inpired by Template Literals**:

```ts
const template = new TemplateString('Hello ${placeholder}');
template.fill({ placeholder: 'world! 🌍' }) // 'Hello world 🌍'
```

The template are typed using [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html "") and provide a nice developer experience:

```ts
const anotherTemplate = new TemplateString('A ${mandatory} ${placeholder}!');

anotherTemplate.fill({ placeholder: 'world! 🌍' }) // ❌
anotherTemplate.fill({ mandatory: 'typed', redundant: 'word' }) // ❌
anotherTemplate.fill({ andatory: 'typed' }) // ❌
anotherTemplate.fill({ mandatory: 'typed' }) // ✅
```

# Aplicaciones Web I - Ejercicio Observer

1. Using our last example create a horizontal card 
  - Change the styles of the cards so they are styled in a horizontal way
2. When scrolling to the bottom should be loaded new entries without clicking a button
3. Simulate an infinite scrolling 

Use the db file and the mockDB for generating fake data. for example:

```js
const db = initMockDB({
  title: "Web app I",
  body: "Intersection Observer"
});

// to get the next data
const data = await db.next();
```
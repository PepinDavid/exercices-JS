1/ Write a function that checks whether two strings are anagrams.

2/ Create a function that flattens an array to any depth.

3/ Write a function to sort an array of objects by a specific key.

4/ Create a `memoize` function that optimizes an expensive function by storing its results.

5/ Create a customized implementation of a data structure similar to `Map`.

6/ Create a customized version of `Promise.all`.

7/ Create a generator function that generates an infinite sequence of numbers from an initial value.

8/ Write a function that executes a list of asynchronous tasks with a parallelization limit.

9/ Create a simple mechanism to simulate prototypal inheritance.

11/ Write a function `toRoman(num)` that takes an integer between 1 and 3999 and returns its representation in Roman numerals.

12/ Create a function `sortByFrequency` that takes a string of characters and returns a new string where the characters are arranged in descending frequency. In the event of a tie, the characters must be sorted alphabetically.

13/ Write an `executeTasks` function that takes an array of asynchronous functions (returning a promise) and executes them in parallel. If a task takes longer than 2 seconds, it must be cancelled.

14/ Create a `LRUCache` class that implements a cache using the **Least Recently Used (LRU)** algorithm. It must have the following methods:
- put(key, value)` : Adds a new key-value to the cache.
- `get(key)`: Returns the value associated with the key, or -1 if the key does not exist.
- The cache has a fixed capacity, and the least recently used entries must be deleted when the limit is reached.

15/ Write a `analyzeText` function that takes a string and returns an object containing:
- The frequency of each word.
- The longest word.
- The most frequent word.

16/ Create a function `flatten` that takes a nested array and returns a flattened array.

18/ Chain several promises to retrieve data successively.
- Create three asynchronous functions (`step1`, `step2`, `step3`) that return promises.
- Each function takes an input value, modifies it (for example, by incrementing or multiplying) and returns it after a random delay.
- Chain these three functions together, starting from value 1.

19/ Simulate errors in a promise chain.
- Creates a `fetchData` function that returns a promise with a random delay.
- This promise fails randomly (50% of cases).
- Implements a promise chain with `then` and `catch` to handle errors.

**Bonus**: Relaunches a new request in the event of an error.

20/ Launch several asynchronous tasks in parallel.
- Create an array of asynchronous functions (e.g. 5 tasks that return values after a random delay).
- Use `Promise.all` to execute these tasks in parallel and retrieve their results.
Exemple:
```js
    const tasks = [task1(), task2(), task3(), task4(), task5()];
    const results = await Promise.all(tasks);
    console.log(results); // [val1, val2, val3, val4, val5]
```
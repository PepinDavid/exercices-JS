1/ **Objective**: Write a function that checks whether two strings are anagrams.

2/ **Objective**: Create a function that flattens an array to any depth.

3/ **Objective**: Write a function to sort an array of objects by a specific key.

4/ **Objective**: Create a `memoize` function that optimizes an expensive function by storing its results.

5/ **Objective**: Create a customized implementation of a data structure similar to `Map`.

6/ **Objective**: Create a customized version of `Promise.all`.

7/ **Objective**: Create a generator function that generates an infinite sequence of numbers from an initial value.

8/ **Objective**: Write a function that executes a list of asynchronous tasks with a parallelization limit.

9/ **Objective**: Create a simple mechanism to simulate prototypal inheritance.

10/ **Objective**: Write a function `toRoman(num)` that takes an integer between 1 and 3999 and returns its representation in Roman numerals.

11/ **Objective**: Create a function `sortByFrequency` that takes a string of characters and returns a new string where the characters are arranged in descending frequency. In the event of a tie, the characters must be sorted alphabetically.

12/ **Objective**: Write an `executeTasks` function that takes an array of asynchronous functions (returning a promise) and executes them in parallel. If a task takes longer than 2 seconds, it must be cancelled.

13/ **Objective**: Create a `LRUCache` class that implements a cache using the **Least Recently Used (LRU)** algorithm. It must have the following methods:
- put(key, value)` : Adds a new key-value to the cache.
- `get(key)`: Returns the value associated with the key, or -1 if the key does not exist.
- The cache has a fixed capacity, and the least recently used entries must be deleted when the limit is reached.

14/ **Objective**: Write a `analyzeText` function that takes a string and returns an object containing:
- The frequency of each word.
- The longest word.
- The most frequent word.

15/ **Objective**: Create a function `flatten` that takes a nested array and returns a flattened array.

16/ **Objective**: Chain several promises to retrieve data successively.
- Create three asynchronous functions (`step1`, `step2`, `step3`) that return promises.
- Each function takes an input value, modifies it (for example, by incrementing or multiplying) and returns it after a random delay.
- Chain these three functions together, starting from value 1.

17/ **Objective**: Simulate errors in a promise chain.
- Creates a `fetchData` function that returns a promise with a random delay.
- This promise fails randomly (50% of cases).
- Implements a promise chain with `then` and `catch` to handle errors.

**Bonus**: Relaunches a new request in the event of an error.

18/**Objective**: Create an algorithm who log time each second and then write finish (condition: use promise)

19/ **Objective**: Launch several asynchronous tasks in parallel.
- Create an array of asynchronous functions (e.g. 5 tasks that return values after a random delay).
- Use `Promise.all` to execute these tasks in parallel and retrieve their results.
Exemple:
```js
    const tasks = [task1(), task2(), task3(), task4(), task5()];
    const results = await Promise.all(tasks);
    console.log(results); // [val1, val2, val3, val4, val5]
```

20/ **Objective**: Retrieve the first resolved promise.
- Creates three promises with different delays (e.g. `100ms`, `200ms`, `300ms`).
- Uses `Promise.race` to return only the first promise resolved.

**Bonus**: Handle errors if one of the promises fails.

21/ **Objective**: Execute a series of promises sequentially.
- Create an array of asynchronous functions (similar to the tasks in exercise 21).
- Uses `Array.prototype.reduce` to execute them one after the other.

22/ **Objective**: Limit the execution frequency of asynchronous calls.
- Implements a `throttleAsync` function that takes an asynchronous function and a delay (`delay`).
- This function ensures that the asynchronous call is not triggered more often than the specified delay.

23/ **Objective**: To store the results of an asynchronous function.
- Creates a `memoizeAsync` function which takes an asynchronous function as input.
- If the function is called with arguments already seen, it returns the cached result directly.

24/ **Objective**: Create a “pipeline” to execute multiple functions on a given value.
- Implement a `pipeline` function that takes a series of functions and executes them in order on a given value.

25/ **Objective**: Implement retry logic for an asynchronous function.
- Create a `retryAsync` function that takes as parameters:
    - An asynchronous function (`fn`),
    - A maximum number of retries (`retries`),
    - A delay between each retry (`delay`).

26/ **Objective**: Implements a stack data structure with a class.
- Implements a `Stack` class with the following methods:
    - push(item)` : adds an item.
    - pop()` : removes the last item.
    - peek()`: returns the last item without removing it.
    - isEmpty()`: returns `true` if the stack is empty.
    - size()`: returns the size of the stack.

27/ **Objective**: Implement a function to run asynchronous tasks **sequentially**.
- Write a function `runSequentially(tasks)` that takes an array of functions returning promises.
- Execute each function sequentially.

28/ **Objective**: Implements a `compose` function to chain several functions.
- The `compose` function must apply functions from right to left.

29/ **Objective**: Implement a recursive function to filter an array.
- Write a function `recursiveFilter(array, predicate)` that recursively filters an array using a predicate.

30/ **Objective**: Implements a **file** data structure with a class.
- Implements a `Queue` class with the following methods:
    - `queue(item)`: adds an item to the queue.
    - dequeue()` : removes the first item.
    - peek()`: returns the first item without removing it.
    - isEmpty()`: returns `true` if the queue is empty.
    - size()`: returns the size of the queue.

31/ **Objective**: Implement the binary search algorithm for a sorted array.
- Write a `binarySearch` function that takes a sorted array and a target value, and returns the index of the value or `-1` if not found.

32/ **Objective**: Implement a function that attempts to restart an asynchronous task on failure.
- Creates a `retry(fn, retries, delay)` function that executes `fn` (an asynchronous function).
- If `fn` fails, it is restarted up to `retries` times, with a delay between each attempt.


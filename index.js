

//Exercice 1
function areAnagrams(str1, str2) {
    if (str1.length !== str2.length) return false;

    const countChar = (str) => {
        const countChar = {};

        for (const letter of str) {
            if (!countChar.hasOwnProperty(letter))
                countChar[letter] = 1;
            else
                countChar[letter] += 1;
        }

        return countChar;
    }

    const countStr1 = countChar(str1);
    const countStr2 = countChar(str2);

    for (const [char, count] of Object.entries(countStr1)) {
        if (count !== countStr2[char]) return false;
    }

    return true;
}

//Exercice 2
function flattenArray(arr) {
    const arrayReturn = [];

    if (!arr.length) return arrayReturn;

    for (const element of arr) {
        if (element instanceof Array) {
            arrayReturn.push(...flattenArray(element))
        }else{
            arrayReturn.push(element)
        }
    }
    return arrayReturn
}

//Exercice 3
function sortByKey(array, key) {
    if (!Array.isArray(array)) throw Error("first argument is not an array !")

    const arrayContainsObjects = (arr) => {
        for (let el of arr) {
            if (typeof el !== "object")
                return false;
        }
        return true;
    }

    if (!arrayContainsObjects(array)) throw Error ("all elements in array aren't object");

    return array.sort((a, b) => { 
        if (a[key] < b[key])
            return -1;
        else
            return 1;
    });
}

//Exercice 4
function memoize(fn) {
    if (typeof fn !== "function") throw Error("argument is not a function");
    const cache = {};

    return function(...args) {
        const arg = JSON.stringify(args);

        if (cache[arg]) return cache[arg];

        const result = fn(...args);

        cache[arg] = result;

		return result;
    }
}

//Exercice 5
class MyMap {
    #map;

    constructor() {
        this.#map = new Object(null);
    }

    set(key, value) {
        if (!this._checkKey(key)) throw Error("key must be string or number")
        this.#map[key] = value;
    }

    get(key) {
        if (!this._checkKey(key)) throw Error("key must be string or number")
        return this.#map[key];
    }

    has(key) {
        if (!this._checkKey(key)) throw Error("key must be string or number")
        return !!this.#map[key]
    }

    delete(key) {
        if (!this._checkKey(key)) throw Error("key must be string or number")
        delete this.#map[key];
    }

    _checkKey(k) {
        return typeof k === 'string' || typeof k === "number";
    }
}

//Exercice 6
function myPromiseAll(promises) {
    if (!Array.isArray(promises)) throw Error('argument must be an array');
    
    return new Promise((resolve, reject) => {
        let accumulator = Promise.resolve([]);
        
        for (const promise of promises) {
            accumulator = accumulator.then(results => 
	            promise.then(result => [...results, result]).catch(reject)
            );
        }
        
        accumulator.then(resolve).catch(reject);
    });
}
// or
async function myPromiseAll(promises) {
    if (!Array.isArray(promises)) throw Error('argument must be an array');
    
     const a = [];
        
    for (const promise of promises) {
        try {
            a.push(await promise)
        } catch(err) {
	        a.push(err)
            throw err;
        }
    }
    
    return a;
}

//Exercice 7
function* infiniteSequence(start = 0) {
    if (typeof start !== 'number') throw Error("argument must be a number")

    while(true) {
        yield start++;
    }
}

//Exercice 8
function parallelLimit(tasks, limit, checkParallelism = true) {
    if (!Array.isArray(tasks)) throw TypeError("argument is not an array");
    if (!isFlatArray(tasks)) tasks = tasks.flat();
    if (!isOnlyPromises(tasks)) tasks = tasks.map(el => transformToPromise(el));

    tasks = groupIntoTable(tasks, limit);
    
    let acc = Promise.resolve([]);

    for (const groupTasks of tasks) {
        acc = acc
            .then(promises => 
                Promise.all(groupTasks)
                .then(gt => [...promises, gt])
            )
    }
    
    return new Promise((resolve, reject) => {
        acc
        .then(parallelizeTasks =>
			  resolve(
				  checkParallelism ? parallelizeTasks : parallelizeTasks.flat()
			  )
		)
        .catch(reject);
    });

    // using hoisting for leave logic at the beginning
    function isFlatArray(arr) {
        return !arr.some(el => Array.isArray(el))
    }

    function isOnlyPromises(arr) {
        return arr.every(el => el instanceof Promise)
    }

    function transformToPromise(element) {
        if (element instanceof Function) return element();
        if (element instanceof Promise) return element;
        return Promise.resolve(element)
    }

    function groupIntoTable(arr, numLimit) {
        const array = [];
        let concatenateArray = [];
        
        for (const el of arr) {
            if (concatenateArray.length === numLimit) {
                array.push(concatenateArray);
                concatenateArray = [];
            }

            concatenateArray.push(el);
        }

        if (concatenateArray.length) array.push(concatenateArray);

        return array;
    }
}
// or
async function parallelLimit(tasks, limit, checkParallelism = true) {
    if (!Array.isArray(tasks)) throw TypeError("argument is not an array");
    if (!isFlatArray(tasks)) tasks = tasks.flat();
    if (!isOnlyPromises(tasks)) tasks = tasks.map(transformToPromise);

    const groupedTasks = groupIntoTable(tasks, limit);

    let sequence = [];

    for (const group of groupedTasks) {
        const acc = [];
        
        try {
            const resp = await Promise.all(group);
             acc.push(...resp);   
        } catch(err) {
            acc.push(err);
        }

        sequence.push(acc);
    }

    return checkParallelism ? sequence : sequence.flat();

    // Utility functions
    function isFlatArray(arr) {
        return !arr.some(el => Array.isArray(el));
    }

    function isOnlyPromises(arr) {
        return arr.every(el => el instanceof Promise);
    }

    function transformToPromise(element) {
        if (typeof element === "function") return element();
        if (element instanceof Promise) return element;
        return Promise.resolve(element);
    }

    function groupIntoTable(arr, numLimit) {
        const grouped = [];
        for (let i = 0; i < arr.length; i += numLimit) {
            grouped.push(arr.slice(i, i + numLimit));
        }
        return grouped;
    }
}

//Exercice 9
function createPrototype(parent) {
    return Object.create(parent);
}


//Exercice 10
function toRoman(num) {
    if (!num) throw new Error('Function takes one argument number');

    if (typeof num === "string") {
        let regexNumbers = /^[0-9]+$/;
        
        if (num.match(regexNumbers)) {
            num = parseInt(num);
        } else {
            throw new Error('Argument must contain only integer');
        }
    } else if (typeof num !== "number") {
        throw new Error('Argument must be an integer or a string interger');
    }

    if (num < 1 || num > 3999) throw new Error('Argument must be between 1 and 3999');

    return convert(num);

    function convert(num) {
        let response = "";
        const principalRomanNumber =  [
            [1000, 'M'],
            [900, 'CM'],
            [500, 'D'],
            [100, 'C'],
            [90, 'XC'],
            [50, 'L'],
            [10, 'X'],
            [9, 'IX'],
            [5, 'V'],
            [1, 'I'],
        ];
        
        for (let i = 0; i < principalRomanNumber.length; i++) {
            const [number, roman] = principalRomanNumber[i];
            let quotient = Math.floor(num / number);

            if (quotient) {
                if (quotient % 4 === 0) {
                    response += (roman + principalRomanNumber[i-1][1]);
                } else {
                    response += roman.repeat(quotient);
                }
            }

            num = num - number * quotient;
        }

        return response;
    }
}


//Exercice 11
function sortByFrequency(str) {
    if (typeof str !== 'string') throw new Error('Argument must be a string');

    const arrayStr = str.split('');
    const frequencies = findFrequency(arrayStr);
    const arraySorted = sortedFrequencies(frequencies);
    
    return arraySorted.map(([key, value]) => key.repeat(value)).join('');

    function findFrequency(arrayString) {
        const frequencies = {};

        for (let letter of arrayString) {
            if (frequencies.hasOwnProperty(letter))
                frequencies[letter] += 1;
            else
                frequencies[letter] = 1;
        }

        return frequencies;
    }

    function sortedFrequencies(arrayFrequencies) {
        return Object.entries(arrayFrequencies)
        .sort((a, b) => {
            const [keyA, valueA] = a;
            const [keyB, valueB] = b;

            return valueB - valueA || keyB.localeCompare(keyA);
        });
    }
}

//Exercice 12
function executeTasks(tasks, timeout) {
    return new Promise((res) => {
        const winningTasks = tasks
        .map((promise) => promiseTimeOut(promise, timeout));
        
        Promise.all(winningTasks)
        .then(res);
    });
    
    function promiseTimeOut(promise, ms) {
        return new Promise(res => {
            Promise.race([
                promise instanceof Function ? promise() : promise,
                new Promise((res) => setTimeout(() => res("Timeout"), ms)),
            ])
            .then(res)
            .catch(res);
        });
    }
}

//Exercice 13
class LRUCache {
    #map = new Map();
    #maxSize = 0;

    constructor(capacity) {
      this.#maxSize = capacity;
    }
  
    put(key, value) {
      if (this.#map.size === this.#maxSize) {
        const firstElement = Array.from(this.#map.keys()).shift();

        this.#map.delete(firstElement);
      }
      
      this.#map.set(key, value);
    }
  
    get(key) {
      if (!this.#map.has(key))
        return -1;

      const value = this.#map.get(key);
      this.#map.delete(value);
      this.#map.set(key, value);

      return value;
    }
}

//Exercice 14
function analyzeText(text) {
    if (typeof text !== 'string') throw new Error('Argument must be a string');
    
    const words = {};
    const response = {
        wordFrequency: {},
        longestWord: "",
        mostFrequentWord: "",
    };
    
    for (const word of text.split(' ')) {
        words[word] = (words[word] || 0) + 1;
    }

    response.wordFrequency = words;
    response.longestWord = Object.keys(words).sort(sortByLongestWord).unshift();
    response.mostFrequentWord =  findMostFrequentWord(words);

    return response;

    function sortByLongestWord(a, b) {
        return b.length - a.length;
    }

    function findMostFrequentWord(words) {
        let temp = 0;
        let finaleWord = 0;

        for (const [word, count] of Object.entries(words)) {
            if (temp < count) {
                temp = count;
                finaleWord = word;
            }
        }

        return finaleWord;
    }
}
  

//Exercice 15
function flatten(arr) {
    const array = [];

    if (!arr.length) return array;

    for (const el of arr) {
        if (el instanceof Array)
            array.push(...flatten(el));
        else
            array.push(el);
    }

    return array;
}

//Exercice 16
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function timeout(value, cb) {
    const t = getRandomInt(1000);
    console.log(t)
    setTimeout(() => {
        cb(value)
    }, t)
}

function promiseAddition(value) {
    return new Promise((res) => {
        timeout(value + 2, res);
    });
}

function promiseMultiply(value) {
    return new Promise((res) => {
        timeout(value * 4, res);
    });
}

function promiseModulo(value) {
    return new Promise((res) => {
        timeout(value % 3, res);
    });
}

//Exercice 17
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function timeout(value, cb) {
    const t = getRandomInt(5000);
    console.log(t)
    setTimeout(() => {
        cb(value)
    }, t)
}

function fetchData(data) {
    return new Promise((res, rej) => {
        const random = getRandomInt(10);

        if (random > 5) rej("Error fetch data");

        timeout(data, res);
    })
}

function fetchDataWithRetry(data, retries = 3) {
    return fetchData(data).catch(err => {
        console.error(err);
        if (retries > 0) {
            console.log(`Retrying... Attempts left: ${retries}`);
            return fetchDataWithRetry(data, retries - 1);
        } else {
            throw new Error("All retries failed.");
        }
    });
}

//Exercice 18

function timeoutWrite(value) {
    return new Promise((res) => {
        setTimeout(() => {
            res(value);
        }, value * 1000);
    })
}

//exemple:
let finish;
for (let i = 1; i < 4; i++) {
    finish = i;
    timeoutWrite(i).then(console.log);
}

timeoutWrite(finish).then(() => console.log('finish'));

// without promise in loop for
let end;
for (let i = 1; i < 4; i++) {
    end = i;
    setTimeout(() => {
        console.log(i);
    }, i * 1000);
}
timeoutWrite(end).then(() => console.log('finish'));


//Exercice 19
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function timeout(value, cb) {
    const t = getRandomInt(5000);
    console.log(t)
    setTimeout(() => {
        cb(value)
    }, t)
}

function taskPromise(data) {
    return new Promise((res) => {
        timeout(data, res);
    })
}

//Exercice 20
function task(data, timeoutMS) {
    return new Promise((res, rej) => {
        if (!data) rej('Error: data is empty');

        setTimeout(() => {
            console.log(`"${data}" resolved after ${timeoutMS}ms`);
            res(data);
        }, timeoutMS);
    });
}

Promise.race([task("task1", 300), task("task2", 200), task("task3", 250)]).then(console.log).catch(console.error)
//or
const tasks = [
    () => task("task1", 300),
    () => task("task2", 200),
    () => task("task3", 250)
];

Promise.race(tasks.map(fn => fn())).then(console.log).catch(console.error)

// Exercice 21
function task(name, delay) {
    return () => new Promise((resolve) => {
        setTimeout(() => {
            resolve(name);
        }, delay);
    });
}

const tasks = [
    task("A", 100),
    task("B", 200),
    task("C", 150)
];

tasks.reduce((promise, task) => 
    promise.then((arr) => 
        task().then(d => arr.concat(d))
    ), 
    Promise.resolve([])
).then(result => console.log("All tasks done:", result));
// or
await tasks.reduce(async (arrayPromise, task) => {
    try {
        const array = await arrayPromise;
        const t = await task();
        
        return [...array, t];
    } catch (error) {
        console.error(error);
    } 
}, Promise.resolve([]));

// Exercice 22
const fetchData = async (num) => {
    return `fetch data ${num}`   
}
// Limit call
const throttledFetch = (fn, delay) => {
    let isThrottled = false;

    return async function(...args) {
        if (isThrottled) {
            console.log(`function ${fn.name} is not finished`);
            return;
        };

        isThrottled = true;

        try {
            return await fn(...args);

        } catch(error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                isThrottled = false;
            }, delay);
        }
    }
}
// or
function throttledFetch(fn, delay) {
    let isThrottled = false;

    return function(...args) {
        return new Promise((res, rej) => {
            if (isThrottled) return;
    
            isThrottled = true;
    
            fn(...args)
            .then(res)
            .catch(rej)
            .finally(() => {
                setTimeout(() => {
                    isThrottled = false;
                }, delay);
            })
        });
    }
}

tf = throttledFetch(fetchData, 2000);

tf(5).then(console.log)
tf(8).then(console.log)
setTimeout(() => tf(15).then(console.log), 2500)
// or
let a = await tf(54);
let b = await tf(54);
console.log(a);
console.log(b);
setTimeout(async () => { let c = await tf(15); console.log(c);}, 2500);

//Exercice 23
const slowFunction = async (x) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return x * 2;
};

function memoizeAsync(fn) {
    const memo = {};

    return async function(...args) {
        if (memo[args.join('')])
            return memo[args.join('')];

        try {
            const res = await fn(...args);

            memo[args.join('')] = res;

            return res;
        } catch(err) {
            console.error(error)
        }
    }
}
// or
function memoizePromise(fn) {
    const memo = {};

    return function(...args) {
        return new Promise((res) => {
            if (memo[args.join('')])
                res(memo[args.join('')]);

            fn(...args)
            .then((data) => {
                memo[args.join('')] = data;

                res(data)
            });
        });
    }
}

const memoizedSlowPromise = memoizePromise(slowFunction);
const memoizedSlowFunction = memoizeAsync(slowFunction);

console.log(await memoizedSlowFunction(2)); // wait 1s, result: 4
console.log(await memoizedSlowFunction(2)); // instantatly result: 4

console.log(await memoizedSlowPromise(2)); // wait 1s, result: 4
console.log(await memoizedSlowPromise(2)); // instantatly result: 4

//Exercice 24
const double = (x) => x * 2;
const increment = (x) => x + 1;
const square = (x) => x ** 2;

const addData = (data) => ({...data, years: 2024});
const changeData = (data) =>({...data, lastname: data.firstname, firstname: data.lastname}); 

function pipeline(value, ...fns){
    if (![...fns].every(fn => fn instanceof Function)) throw new Error('args must be functions');

    for(const fn of fns) {
        value = fn(value)
    }

    return value;
}

console.log(pipeline(2, double, increment, square));
console.log(pipeline({lastname: "John", firstname: "Doe"}, addData, changeData));

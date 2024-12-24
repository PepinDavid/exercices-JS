

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


//exercices 11
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


// Exercice 12
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

// Exercice 13
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

// Exercice 14
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

//Exercice 15
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
  

//Exercice 16
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

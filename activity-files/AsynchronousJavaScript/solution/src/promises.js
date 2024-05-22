// QuickLab 16b - Promises
export function runPromise() {
    const aPromise = new Promise((resolve, reject) => {
        const delayedFunc = setTimeout(() => {
            //whether it resolves or rejects is unknown
            const randomNumber = Math.random();
            (randomNumber < 0.5) ? resolve(randomNumber) : reject(randomNumber);
        }, Math.random() * 5000); //function will return sometime: 0-5s
    });

    aPromise
        .then(
            //resolved
            data => {
                console.log(`Promise resolved with value ${data}`);
            },
        )
        .catch(
            //rejected
            error => {
                console.error(`Promise rejected with value ${error}`);
            }
    );
}

// async-await version

export async function runPromiseAsync() {
    const aPromise = new Promise((resolve, reject) => {
        const delayedFunc = setTimeout(() => {
            // whether it resolves or rejects is unknown
            const randomNumber = Math.random();
            (randomNumber < 0.5) ? resolve(randomNumber) : reject(randomNumber);
        }, Math.random() * 5000); // function will execute and return sometime: 0-5s
    });

    try {
        const data = await aPromise;
        console.log(`Async Promise resolved with value ${data}`);
    }
    catch (error) {
        console.error(`Async Promise rejected with value ${error}`);
    }
}

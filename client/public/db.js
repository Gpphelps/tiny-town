let db;
const request = indexedDB.open('tinyTown', 1);

import { useMutation } from '@apollo/client';
import { SAVE_BUILDINGS } from '../src/utils/mutations';

// Creates the objectStore when there is a new version of the DB that is requested
request.onupgradeneeded = function (event) {
    db = event.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
};

request.onsuccess = function (event) {
    db = event.target.result;
    // Checks if application is online before the DB get read
    if(navigator.onLine) {
        checkDatabase();
    }
};

// If there is an error with the request it is logged to the console
request.onerror = function (event) {
    console.log(event.target.errorCode)
};

// Checks the indexdb for stored transactions and submits a post request to the mongoose db with the stored transactions
function saveRecord(record) {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    store.add(record);
}

function checkDatabase() {
    const transaction = db.transaction(['pending'], 'readwrite');
    const store = transaction.objectStore('pending');
    const getAll = store.getAll();

    const [saveBuildings, { error }] = useMutation(SAVE_BUILDINGS);

    getAll.onsuccess = async function () {
        if (getAll.results.length > 0) {
            try {
                await saveBuildings({ variables: getAll })
            } catch {
                console.log(error.message)
            }
        }
        const transaction = db.transaction(["pending"], "readwrite");
        const store = transaction.objectStore("pending");
        store.clear();
    }
}

// Listens for the application coming online
window.addEventListener("online", checkDatabase);
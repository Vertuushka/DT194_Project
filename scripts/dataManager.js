function getMaxId(dataName) {
    let maxId = 0;

    for (let key in localStorage) {
        if (key.startsWith(`${dataName}_`)) {
            let id = parseInt(key.split("_").pop(), 10);
            if (id > maxId) {
                maxId = id;
            }
        }
    }

    return maxId;
}



function addNewData(dataName, data) {
    let maxId = getMaxId(dataName) || 0;
    let id = maxId + 1;
    let key = `${dataName}_${id}`;

    try {
        localStorage.setItem(key, JSON.stringify({ id: id, ...data }));
    } catch (e) {
        return false;
    }
    
    return true;
}

function readData(dataName, id) {
    let key = `${dataName}_${id}`;
    let data;

    if (localStorage.getItem(key)) {
        data = JSON.parse(localStorage.getItem(key));
    } else {
        data = false;
    }

    return data;
}

function getCollectionsByDate(dataName, date) {
    let result = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith(dataName)) {
            let storedData = localStorage.getItem(key);
            try {
                let items = JSON.parse(storedData);
                if (items.date === date) {
                    result.push(items);
                }
            } catch (e) {
                return null;
            }
        }
    }
    return result;
}

function updateData(dataName, id, newData) {
    let key = `${dataName}_${id}`;

    if (localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify({ id: id, ...newData }));
        return true;
    }

    return false;
}

function deleteData(dataName, id) {
    let key = `${dataName}_${id}`;

    if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        return true;
    }

    return false;
}

function sortByWeight(data) {
    let sortedData = data;
    sortedData.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
    return sortedData;
}

function sortByDate(data) {
    let sortedData = data;
    sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedData; 
}

function login(credentials) {
    if (credentials.username === 'admin' && credentials.password === 'admin') {
        addNewData("loginRequired", false);
        return true;
    } else { return false; }
}

export { getMaxId, addNewData, readData, updateData, deleteData, getCollectionsByDate, sortByWeight, sortByDate };
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

export { getMaxId, addNewData, readData, updateData, deleteData };
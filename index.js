// Your code here

const createEmployeeRecord = (array) => {
     return  {
     firstName: array[0],
     familyName: array[1],
     title: array[2],
     payPerHour: array[3],
     timeInEvents: [],
     timeOutEvents: []
    }

};

const createEmployeeRecords = (newArr) => {
    return newArr.map((array) => {
        return createEmployeeRecord(array);
    });
};

const createTimeInEvent = (empObj, timeStamp) => {
    let [date, hour] = timeStamp.split(' ');
    empObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return empObj;
};

const createTimeOutEvent = (empObj, timeStamp) => {
    let [date, hour] = timeStamp.split(' ');
    empObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return empObj;
};

const hoursWorkedOnDate = (empObj, timeStamp) => {
    let inTime = empObj.timeInEvents.find((emp) => {
        return emp.date === timeStamp;
    });
    let outTime = empObj.timeOutEvents.find((emp) => {
        return emp.date === timeStamp;
    });
    return (outTime.hour - inTime.hour) / 100;
};

const wagesEarnedOnDate = (empObj, timeStamp) => {
    let payCheck = hoursWorkedOnDate(empObj, timeStamp) * empObj.payPerHour;
    return parseFloat(payCheck.toString());
};

const allWagesFor = (empObj) => {
    let dates = empObj.timeInEvents.map((emp) => {
        return emp.date;
    });

    let wages = dates.reduce((acc, d) => {
        return acc + wagesEarnedOnDate(empObj, d);
    }, 0);
    return wages;
};

const calculatePayroll = (arrayOfEmp) => {
    return arrayOfEmp.reduce((acc, record) => {
        return acc + allWagesFor(record);
    }, 0)
};

const findEmployeeByFirstName = (srcArry, firstName) => {
    return srcArry.find((emp) => {
        return emp.firstName === firstName;
    })
};




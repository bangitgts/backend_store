function formatDate(date) {
    let today = new Date(date);
    return {
        date: `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`,
        hour: `${today.getHours()}:${today.getMinutes()}`
    }
};
module.exports = formatDate;
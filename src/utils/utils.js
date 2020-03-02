export const nbWithSpaces = (number) => {
    const numberToStr = number.toString().split(' ').join('');
    const offset = numberToStr.length % 3;
    let newStr = '';
    for (let i = 0; i < numberToStr.length; i += 1) {
        if (i > 0 && i % 3 === offset) {
        newStr += ' ';
        }
        newStr += numberToStr[i];
    }
    return newStr;
};

export const nbWithoutSpaces = (numberStingify) => {
    const withOutSpace = numberStingify.split(' ').join('');
    return parseInt(withOutSpace, 10);
};


export const isGoodEmail = email => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};

export const isGoodPassword = password => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(String(password));
};

export const isGoodText = (name) => {
    if (name === '' || !name) {
        return false;
    }
    const regex = /^[_A-z]*((-|\s)*[_A-z])*$/;
    return regex.test(String(name))
    && typeof name === 'string';
};

export const isGoodNumber = (nb) => {
    const withOutSpace = nb.split(' ').join('');
    return /^\d+$/.test(withOutSpace);
};

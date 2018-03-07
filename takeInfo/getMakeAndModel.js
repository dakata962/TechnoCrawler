const getPosition = (string, subString, index) => {
    return string.split(subString, index).join(subString).length;
};

const getMake = (urlOfphone, startIndex) => {
    // delete the first part of the url
    urlOfphone = urlOfphone.substring(startIndex);

    let make;
    if (urlOfphone.startsWith('apple')) {
        make = urlOfphone.substring(0, getPosition(urlOfphone, '-', 2));
    } else {
        make = urlOfphone.substring(0, getPosition(urlOfphone, '-', 1));
    }

    if ((make.toLowerCase() === 'apple-iphone')) {
        make = 'apple';
    }
    make = make.toLowerCase();
    return make;
};

const getModel = (urlOfphone, startIndex) => {
    // delete the first part of the url
    urlOfphone = urlOfphone.substring(startIndex);

    let model;
    if (urlOfphone.startsWith('apple')) {
        urlOfphone = urlOfphone.substring(getPosition(urlOfphone, '-', 2) + 1);
        model = urlOfphone.substring(0, urlOfphone.lastIndexOf('-'));
    } else {
        urlOfphone = urlOfphone.substring(getPosition(urlOfphone, '-', 1) + 1);
        model = urlOfphone.substring(0, urlOfphone.lastIndexOf('-'));
    }

    model = model.toLowerCase();
    return model;
};

module.exports = {
    getMake,
    getModel,
};

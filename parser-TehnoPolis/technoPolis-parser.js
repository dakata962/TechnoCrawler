const {
    JSDOM
} = require("jsdom");

const _ = require("lodash");

const $init = require("jquery");

const {
    getMake,
    getModel
} = require('../takeInfo/getMakeAndModel.js');

const getPagesUrlsTechnopolis = async () => {
    const technopolisLink = "http://www.technopolis.bg/bg//%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8-%D0%B8-%D0%A2%D0%B0%D0%B1%D0%BB%D0%B5%D1%82%D0%B8/%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8/c/P11040101?pricerange=309%3B2599&q=%3Aprice-asc&pageselect=100&page=";
    const dom = await JSDOM.fromURL(technopolisLink + 0);
    const $ = $init(dom.window);
    const pagesLinks = [...$(".paging a")].map((link) => {
        const sublink = $(link).attr("href");
        const fromIndex = sublink.indexOf("&page=") + "&page=".length;
        const toIndex = sublink.indexOf("&", fromIndex + 1);
        const page = sublink.substring(fromIndex, toIndex);
        return technopolisLink + page;
    });

    return [technopolisLink, ...pagesLinks];
};

const getUrlsTechnoPolis = async () => {
    const pageUrls = await getPagesUrlsTechnopolis();

    const links = (await Promise.all(pageUrls.map((pageUrl) => JSDOM.fromURL(pageUrl))))
        .map((dom) => $init(dom.window))
        .map(($) => [...$(".product-box h2 a")]
            .map((link) => $(link)
                .attr("href")));

    return _.chain(links)
        .flatten()
        .sortedUniq()
        .value();
};

let runTehnoPolis = async () => {

    let resultUrlsTechnoPolis = await getUrlsTechnoPolis();

    const chunkRequests = async (phoneArrObeject) => {
        let chunkOfFive = resultUrlsTechnoPolis.splice(0, 5);

        if (chunkOfFive.length === 0) {
            return phoneArrObeject;
        }

        phoneArrObeject.push(await Promise.all(chunkOfFive.map((url) => {
            return currentPhone(url);
        })));

        return chunkRequests(phoneArrObeject);
    }

    const currentPhone = async (currentUrl) => {
        let url = 'http://www.technopolis.bg' + currentUrl;
        const dom = await JSDOM.fromURL(url);
        const $ = $init(dom.window);
        const classWithInfo = $("td").text();
        let weigth = '0';
        if (classWithInfo.includes('ТЕГЛО')) {
            weigth = classWithInfo.substring(classWithInfo.indexOf('ТЕГЛО') + 5, classWithInfo.indexOf('ТЕГЛО') + 8)
            weigth = weigth.trim();
            weight = weigth.replace(/\D/g, '');
        }
        let gb = '0';
        if (classWithInfo.includes('ПАМЕТ')) {
            gb = classWithInfo.substring(classWithInfo.indexOf('ПАМЕТ') + 5, classWithInfo.indexOf('ПАМЕТ') + 8);
            gb = gb.trim();
            if (gb.includes('НЕ'))
                gb = '0';
        }
        let make = getMake(url, 56);
        let model = getModel(url, 56);

        // console.log({
        //     make,
        //     model,
        //     gb,
        //     weigth,
        // });

        return {
            make,
            model,
            gb,
            weigth,
            site:'technoPolis',
        };
    }

    // chunkRequests([]);
    return chunkRequests([]);
};

module.exports = {
    runTehnoPolis
};
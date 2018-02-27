const {
    JSDOM
} = require("jsdom");

const _ = require("lodash");

const $init = require("jquery");

// var technomarketParser = require('parsers/technomarket-parser');

const getPagesUrlsTechnopolis = async () => {
    const technopolisLink = "http://www.technopolis.bg/bg//%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8-%D0%B8-%D0%A2%D0%B0%D0%B1%D0%BB%D0%B5%D1%82%D0%B8/%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8/c/P11040101?pricerange=&pageselect=100&page=";
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

const getPagesUrlsTechnoMarket = async () => {
    const technopolisLink = 'https://www.technomarket.bg/product/filter?filter_form%5Bsort%5D=default&filter_form%5Bprice%5D%5Bmin%5D=39&filter_form%5Bprice%5D%5Bmax%5D=2649&filter_form%5Bspec_gsm_display%5D%5Bmin%5D=&filter_form%5Bspec_gsm_display%5D%5Bmax%5D=&filter_form%5Bspec_gsm_battery%5D%5Bmin%5D=&filter_form%5Bspec_gsm_battery%5D%5Bmax%5D=&filter_key=%2Ftelefoni%7Cstatic%7Cstatic&from=0&size=999';
    const dom = await JSDOM.fromURL(technopolisLink);
    const $ = $init(dom.window);
    const pagesLinks = [...$(".paging a")].map((link) => {
        const sublink = $(link).attr("href");
        const fromIndex = sublink.indexOf("&page=") + "&page=".length;
        const toIndex = sublink.indexOf("&", fromIndex + 1);
        const page = sublink.substring(fromIndex, toIndex);
        return technopolisLink;
    });

    return [technopolisLink, ...pagesLinks];
};

const getUrlsTechnoMarket = async () => {
    const pageUrls = await getPagesUrlsTechnoMarket();

    const links = (await Promise.all(pageUrls.map((pageUrl) => JSDOM.fromURL(pageUrl))))
        .map((dom) => $init(dom.window))
        .map(($) => [...$(".product a")]
            .map((link) => $(link)
                .attr("href")));

    return _.chain(links)
        .flatten()
        .sortedUniq()
        .value();
};

let resultUrlsTechnoMarket;
let runTehnoMarket = Promise.resolve(getUrlsTechnoMarket());
runTehnoMarket.then((value) => {
    resultUrlsTechnoMarket = value;
}).then(() => {
    console.log(resultUrlsTechnoMarket)
})


// TechnoPolis


let resultUrlsTechnoPolis;
let runTehnoPolis = Promise.resolve(getUrlsTechnoPolis());

runTehnoPolis.then((value) => {
    resultUrlsTechnoPolis = value;
}).then(() => {
    // console.log(resultUrlsTechnoPolis)
    
})


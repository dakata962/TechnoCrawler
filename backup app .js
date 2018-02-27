const {
    JSDOM
} = require("jsdom");

const _ = require("lodash");

const $init = require("jquery");

let urlsTechnoMarket;


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

const runTehnopolis = async () => {
    urlsTechnoPolis = await getUrlsTechnoPolis();
    return urlsTechnoPolis;
    // console.log(urlsTechnoPolis);
};

//////////////////////////////////////////

const getPagesUrlsTechnoMarket = async () => {
    const technopolisLink = 'https://www.technomarket.bg/telefoni';
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


const runTehnoMarket = async () => {
    urlsTechnoMarket = await getUrlsTechnoMarket();
   return urlsTechnoMarket
};

runTehnoMarket.then(function(result) {
    // here you can use the result of promiseB
});

let urlsPhonesTechnoMarket = runTehnoMarket();
setTimeout(function(){ console.log(urlsPhonesTechnoMarket) }, 5000);



// let result;
// let runTehnoMarket = Promise.resolve(getUrlsTechnoMarket());

// runTehnoMarket.then((value) => {
//     result = value;
//     console.log(result)

// })

// console.log(result)
// var a = await runTehnopolis();
// console.log(a);
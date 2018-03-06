const {
    JSDOM
} = require("jsdom");

const _ = require("lodash");

const $init = require("jquery");

const {
    getMake,
    getModel
} = require('../takeInfo/getMakeAndModel.js');

const getPagesUrlsTechnoMarket = async () => {
    const technopolisLink = 'https://www.technomarket.bg/product/filter?filter_form%5Bsort%5D=default&filter_form%5Bprice%5D%5Bmin%5D=39&filter_form%5Bprice%5D%5Bmax%5D=2649&filter_form%5Bspec_gsm_display%5D%5Bmin%5D=&filter_form%5Bspec_gsm_display%5D%5Bmax%5D=&filter_form%5Bspec_gsm_battery%5D%5Bmin%5D=&filter_form%5Bspec_gsm_battery%5D%5Bmax%5D=&filter_key=%2Ftelefoni%7Cstatic%7Cstatic&from=100&size=150';
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

let runTehnoMarket = async () => {

    let resultUrlsTechnoMarket = await getUrlsTechnoMarket();

    const chunkRequests = async (phoneArrObeject) => {
        let chunkOfFive = resultUrlsTechnoMarket.splice(0, 5);

        if (chunkOfFive.length === 0){
            return chunkOfFive;
        }

        phoneArrObeject.push(await Promise.all(chunkOfFive.map((url) => {
            return currentPhone(url);
        })));

        return chunkRequests(phoneArrObeject);
    }

    const currentPhone = async (currentUrl) => {
        let url = 'https://www.technomarket.bg' + currentUrl;
        const dom = await JSDOM.fromURL(url);
        const $ = $init(dom.window);
        const classWithInfo = $(".moreLines").text();
        // console.log(classWithInfo)
        const model = getModel(url, 37);
        const make = getMake(url, 37);

        let gb = '0';
        if (classWithInfo.includes('ПАМЕТ: ')) {
            gb = classWithInfo.substring(classWithInfo.indexOf('ПАМЕТ: ') + 7, classWithInfo.indexOf('ПАМЕТ: ') + 10);
            gb = gb.replace(/\D/g, '').trim();
        }

        let weigth = '0';
        if (classWithInfo.includes('ТЕГЛО: ')) {
            weigth = classWithInfo.substring(classWithInfo.indexOf('ТЕГЛО: ') + 7, classWithInfo.indexOf('ТЕГЛО: ') + 11);
            weigth = weigth.replace(/\D/g, '').trim();
        }
        console.log({
            make,
            model,
            gb,
            weigth,
        });

        return {
            make,
            model,
            gb,
            weigth,
        };
    }
    
    chunkRequests([]);
    // return chunkRequests([]);
}

module.exports = {
    runTehnoMarket
};
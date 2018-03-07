const {
    runTehnoPolis,
} = require('./parser-TehnoPolis/technoPolis-parser.js');

const {
    runTehnoMarket,
} = require('./parser-TechnoMarket/technoMarket-parser.js');

const {
    phones,
} = require('./models');


const addObjectsToDB = (arr) => {
    arr.forEach((element) => {
        element.forEach((el) => {
            phones.create({
                make: el.make,
                model: el.model,
                gb: el.gb,
                weigth: el.weigth,
                site: el.site,
            });
        });
    });
};

const update = async () => {
    console.log('\nStart crawler');
    const arrObjTechnoMarket = await runTehnoMarket();
    const arrObjTechnoPolis = await runTehnoPolis();

    console.log('Adding data to DB');
    addObjectsToDB(arrObjTechnoMarket);
    addObjectsToDB(arrObjTechnoPolis);
};

process.argv.forEach((val, index, array) => {
    if (val === 'update') {
        // update();
    }
    console.log(val);
});
const program = require('commander');

const {
    phones,
} = require('./models');

const {
    runTehnoPolis,
} = require('./parser-TehnoPolis/technoPolis-parser.js');

const {
    runTehnoMarket,
} = require('./parser-TechnoMarket/technoMarket-parser.js');


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

program
    .command('update')
    .action(() => {
        console.log('update()');
    });

program
    .command('statistics <filter>')
    .action((filter) => {
        let argsArr;
        if (filter.includes('-')) {
            argsArr = filter.split('-');
        } else {
            argsArr = filter.split(':');
        }
        console.log(argsArr);
        if (argsArr[0] === 'filter') {
            if (argsArr[1] === 'ram') {
                if (argsArr[2] === 'gt') {
                    //
                } else if (argsArr[2] === 'lt') {
                    //
                }
            } else if (argsArr[1] === 'weigth') {
                if (argsArr[2] === 'gt') {
                    //
                } else if (argsArr[2] === 'lt') {
                    //
                }
            }
        } else if (argsArr[0] === 'search') {
            //search argsArr[1] make/model

        } //order by make
        else if (argsArr[0] === 'order') {
            if (argsArr[2] === 'make') {
                //
            } else if (argsArr[2] === 'weigth') {
                //
            }
        }
    });
program.parse(process.argv);
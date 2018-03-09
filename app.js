/* global process */
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
        update();
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

        // console.log(argsArr);
        if (argsArr[0] === 'filter') {
            if (argsArr[1] === 'gb') {
                if (argsArr[2] === 'gt') {
                    const numberToSearch = +argsArr[3]
                        .slice(0, argsArr[3].length - 2);
                    // console.log(numberToSearch);
                    phones.findAndCountAll({
                        where: {
                            gb: {
                                gt: numberToSearch,
                            },
                        },
                    }).then((obj) => {
                        obj.rows.forEach((ob) => console.log(
                            JSON.stringify(ob.make + ' ' +
                                ob.model + ' gb: ' + ob.gb)));

                        console.log('\nDisplayed rows: ' + obj.count);
                    });
                } else if (argsArr[2] === 'lt') {
                    const numberToSearch = +argsArr[3]
                        .slice(0, argsArr[3].length - 2);
                    // console.log(numberToSearch);
                    phones.findAndCountAll({
                        where: {
                            gb: {
                                lt: numberToSearch,
                            },
                        },
                    }).then((obj) => {
                        obj.rows.forEach((ob) => console.log(
                            JSON.stringify(ob.make + ' ' +
                                ob.model + ' gb: ' + ob.gb)));

                        console.log('\nDisplayed rows: ' + obj.count);
                    });
                }
            } else if (argsArr[1] === 'weigth') {
                if (argsArr[2] === 'gt') {
                    const numberToSearch = +argsArr[3]
                        .slice(0, argsArr[3].length - 1);
                    // console.log(numberToSearch);
                    phones.findAndCountAll({
                        where: {
                            weigth: {
                                gt: numberToSearch,
                            },
                        },
                    }).then((obj) => {
                        obj.rows.forEach((ob) =>
                            console.log(JSON.stringify(ob.make + ' ' +
                                ob.model + ' weigth: ' + ob.weigth)));

                        console.log('\nDisplayed rows: ' + obj.count);
                    });
                } else if (argsArr[2] === 'lt') {
                    const numberToSearch = +argsArr[3]
                        .slice(0, argsArr[3].length - 1);
                    // console.log(numberToSearch);
                    phones.findAndCountAll({
                        where: {
                            weigth: {
                                lt: numberToSearch,
                            },
                        },
                    }).then((obj) => {
                        obj.rows.forEach((ob) => console.log(
                            JSON.stringify(ob.make + ' ' +
                                ob.model + ' weigth: ' + ob.weigth)));
                        console.log('\nDisplayed rows: ' + obj.count);
                    });
                }
            }
        } else if (argsArr[0] === 'search') {
            // search argsArr[1] make/model
            console.log(argsArr[1]);
            if (argsArr[1] === 'make') {
                phones.findAndCountAll({
                    where: {
                        make: argsArr[2],
                    },
                }).then((obj) => {
                    obj.rows.forEach((ob) =>
                        console.log(JSON.stringify(ob.make + ' ' +
                            ob.model)));

                    console.log('\nDisplayed rows: ' + obj.count);
                });
            }
        } else if (argsArr[0] === 'order') {
            if (argsArr[2] === 'make') {
                phones.findAndCountAll({
                    order: [
                        ['make', 'ASC'],
                        ['model', 'ASC'],
                    ],
                }).then((obj) => {
                    obj.rows.forEach((ob) =>
                        console.log(JSON.stringify(ob.make + ' ' +
                            ob.model)));

                    console.log('\nDisplayed rows: ' + obj.count);
                });
            }
        } else {
            console.log('\nSupported commands are: filter, search and order');
        }
    });
program.parse(process.argv);

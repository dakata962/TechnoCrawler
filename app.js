const {
    runTehnoPolis
} = require('./parser-TehnoPolis/technoPolis-parser.js');

const {
    runTehnoMarket
} = require('./parser-TechnoMarket/technoMarket-parser.js');

const main = async () => {
    let arrObjTechnoMarket = await runTehnoMarket();

    arrObjTechnoMarket.forEach((element) => {
        element.forEach((el) => {
            console.log(el);
            console.log('-'.repeat(30))
        })
    });

    // let arrObjTechnoPolis= await runTehnoPolis();
    //foreach .. 
    //cykai bazata
}

main();
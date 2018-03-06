const {
    runTehnoPolis
} = require('./parser-TehnoPolis/technoPolis-parser.js');

const {
    runTehnoMarket
} = require('./parser-TechnoMarket/technoMarket-parser.js');


runTehnoMarket();
runTehnoPolis();


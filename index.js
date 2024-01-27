const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = "./data.json";

import('random').then((random) => {
    const makeCommit = (n) => {
        if (n === 0) return simpleGit().push();

        const currentYear = moment().year();
        const x = random.default.int(0, 54);
        const y = random.default.int(0, 6);

        // Ensure the commit date is within the current year
        const DATE = moment().year(currentYear)
            .startOf('year')
            .add(x, 'w').add(y, 'd').format();

        const data = {
            date: DATE,
        };

        console.log(DATE);

        jsonfile.writeFile(FILE_PATH, data, () => {
            simpleGit().add([FILE_PATH]).commit(DATE, { "--date": DATE },
                makeCommit.bind(this, --n));
        });
    }

    makeCommit(3000);
});
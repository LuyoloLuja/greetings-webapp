const pg = require('pg');
const Pool = pg.Pool;
const assert = require('assert');
const Greetings = require('../greetings');
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greet_test_db';

const pool = new Pool({
    connectionString
});

describe("The Greet function", function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from users;");
    })

    it('Should greet the user in different languages if the language is selected and name is entered', async function () {
        let greetings = Greetings(pool);
        assert.equal('Molo, Luyolo!', await greetings.userInput('Luyolo', 'isixhosa'));
        assert.equal('Hi, Luyolo!', await greetings.userInput('Luyolo', 'english'));
        assert.equal('More, Luyolo!', await greetings.userInput('Luyolo', 'afrikaans'));
    })

    it('Should return undefined if no name is entered', async function () {
        let greetings = Greetings(pool);
        assert.equal(undefined, await greetings.userInput('', 'english'));
    })

    it('Should return undefined if no language is selected', async function () {
        let greetings = Greetings(pool);
        assert.equal(undefined, await greetings.userInput('Luyolo', ''));
    })

    it('Should return undefined if no name is entered and language is not selected', async function () {
        let greetings = Greetings(pool);
        assert.equal(undefined, await greetings.userInput('', ''));
    })

    it('Counter should not increment if name already exists', async function () {
        let greetings = Greetings(pool);

        await greetings.setNames('Luyolo');
        await greetings.setNames('Luyolo');
        await greetings.setNames('Luyolo');
        await greetings.setNames('Luyolo');

        assert.equal(1, await greetings.getCounter());
    })
    it('getCounter should increment if different names have been greeted', async function () {
        let greetings = Greetings(pool);

        await greetings.setNames('Luyolo');
        await greetings.setNames('Simthe');
        await greetings.setNames('Athi');
        await greetings.setNames('Cairo');
        await greetings.setNames('Athi');
        await greetings.setNames('Luja');
        await greetings.setNames('Luyolo');

        assert.equal(5, await greetings.getCounter());
    })

    it('userTimesGreeted should count how many times each user has been greeted', async function () {
        let greetings = Greetings(pool);

        await greetings.setNames('Luyolo');
        await greetings.setNames('Luyolo');
        await greetings.setNames('Luyolo');
        await greetings.setNames('Luyolo');
        await greetings.setNames('Luyolo');

        assert.equal(5, await greetings.userTimesGreeted('Luyolo'));
    })
})
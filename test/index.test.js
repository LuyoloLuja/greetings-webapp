const pg = require('pg');
const Pool = pg.Pool;
const assert = require('assert');
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetingsDB';

const pool = new Pool({
	connectionString
  });

const Greet = require('../greetings');

const greet = Greet(pool)
{}
describe("Greet function", function(){
    // beforeEach()
 
    it('should return greet message when language and name is passed', async () => {
        assert.equal('Molo, Piet!', await greet.userInput('Piet', 'isixhosa'))
        assert.equal(undefined, await greet.userInput('', 'isixhosa', 'No name provided'))
        assert.equal(undefined, await greet.userInput('Piet', ''), 'No language provided')
    })

    it('should add name to db', async() => {
        greet.setNames("Jan");
        const result = await  greet.getUserByName('Jan');
        assert.equal(1, result.timesGreeted);
    });
    // it('should update name to db', async () => {
    //     greet.setNames('Jan');
    //     const result = await  greet.getUserByName('Jan');
    //     assert.equal(2, result.timesGreeted);
    // });
    // it('should delete name to db', () => {});
    // it('should find all name to db', () => {});
})

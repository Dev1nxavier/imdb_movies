require ('jest');

require('dotenv').config();
const { API_URL } = process.env;
const axios = require('axios');
const { italic } = require('chalk');

describe('Boolean', ()=>{
    it('Confirms testing functionality', async()=>{
        expect(true === true).toEqual(true);
    })

    it('Confirms base route', async()=>{
        const res = await axios.get(`${API_URL}/`);
        console.log(res);
        expect(res.data.status).toEqual(true);
    })

    describe('Test server health', ()=>{
        it('tests GET /health', async()=>{
            const res = await axios.get(`${API_URL}/health`);
            console.log('server status:', res.data.message);
            expect(res.data.message).toEqual('Server is healthy...');
        })
    })

    describe('Test movie ratings routes', ()=>{
        it('tests POST /save-movie', async()=>{
            const res = await axios.post(`${API_URL}/save-movie`, {imdb_id: 12455, thumbs_up: true, imdb_rating: 7.5});

            console.log(res);

            expect(res.data.status).toEqual(true);
        })
    })
})
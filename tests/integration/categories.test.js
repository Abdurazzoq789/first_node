const request = require('supertest');
let server;
const { Category } = require('../../models/category');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

describe('/api/categories', () => {
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(async () => {
        server.close();
        await Category.remove({});
    });

    describe('GET /', () => {
        it('should return all categories', async () => {
            await Category.collection.insertMany([
                { name: 'dasturlash' },
                { name: 'tarmoqlash' },
                { name: 'dizayn' }
            ]);

            const response = await request(server).get('/api/categories');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            expect(response.body.some(cat => cat.name == 'dasturlash')).toBeTruthy();

        });
    });

    describe('GET /:id', () => {
        it('should return category if valid id is given', async () => {
            const category = new Category({ name: 'suniy idrok' });
            await category.save();

            const response = await request(server).get('/api/categories/' + category._id);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', 'suniy idrok');
        });

        it('should return 404 if invalid id is given', async () => {
            const response = await request(server).get('/api/categories/123');
            expect(response.status).toBe(404);
        });

        it('should return 404 if no category with the passed id exist', async () => {
            const categoryId = mongoose.Types.ObjectId();
            const response = await request(server).get('/api/categories/' + categoryId);
            expect(response.status).toBe(404);
        });

    });

    describe('POST /', () => {
        let token;
        let name;

        const execute = async () => {
            return await request(server)
                .post('/api/categories')
                .set('x-auth-token', token)
                .send({ name });
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'dasturlash';
        });

        it('should return 401 if user is not logged in', async () => {
            token = '';
            const res = await execute();
            expect(res.status).toBe(401);
        });

        it('should return 400 if category name is less than 3 characters', async () => {
            name = '12';
            const res = await execute();
            expect(res.status).toBe(400);
        });

        it('should return 400 if category name is more than 50 characters', async () => {
            name = new Array(52).join('c');
            const res = await execute();
            expect(res.status).toBe(400);
        });


        it('should save the category if it is valid', async () => {
            await execute();
            const category = await Category.find({ name: 'dasturlash ' });
            expect(category).not.toBeNull();
        });

        it('should return the category if it is valid', async () => {
            const res = await execute();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'dasturlash');
        });
    });

    describe('PUT /:id', () => {
        let token;
        let name;

        const execute = async () => {
            const category = new Category({ name: 'suniy idrok' });
            const res = await category.save();

            return await request(server)
                .put('/api/categories/' + res._id)
                .set('x-auth-token', token)
                .send({ name: name });
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'ozgardi'
        });

        it('should return updated category if valid id is given', async () => {
            const response = await execute();
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', name);
        });

        it('should return 404 if invalid id is given', async () => {
            const response = await request(server).get('/api/categories/123');
            expect(response.status).toBe(404);
        });

        it('should return 401 if user is not logged in', async () => {
            token = '';
            const res = await execute();
            expect(res.status).toBe(401);
        });

        it('should return 400 if category name is less than 3 characters', async () => {
            name = '12';
            const res = await execute();
            expect(res.status).toBe(400);
        });

        it('should return 400 if category name is more than 50 characters', async () => {
            name = new Array(52).join('c');
            const res = await execute();
            expect(res.status).toBe(400);
        });

        it('should return 404 if no category with the passed id exist', async () => {
            const categoryId = mongoose.Types.ObjectId();
            const response = await request(server).get('/api/categories/' + categoryId);
            expect(response.status).toBe(404);
        });
    });

    // describe('DELETE /:id', () => {
    //     let token;

    //     const execute = async () => {
    //         const category = new Category({ name: 'suniy idrok' });
    //         const res = await category.save();

    //         return await request(server)
    //             .delete('/api/categories/' + res._id)
    //             .set('x-auth-token', token)
    //             // .send({ name });
    //     } 

    //     beforeEach(async () => {
    //         token = new User().generateAuthToken();
    //     });

    //     it('should return 403 if user is not admin', async () => {
    //         const response = await execute();
    //         expect(response.status).toBe(403);
    //         // expect(response.body).toHaveProperty('name', name);
    //     });

    //     it('should delete if given category is valid', async () => {
    //         const response = await execute();
    //         expect(response.status).toBe(200);
    //     });

    //     it('should return 404 if invalid id is given', async () => {
    //         const response = await request(server).get('/api/categories/123');
    //         expect(response.status).toBe(404);
    //     });

    //     it('should return 401 if user is not logged in', async () => {
    //         token = '';
    //         const res = await execute();
    //         expect(res.status).toBe(401);
    //     });
    // });
});
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('dentists', [{
                name: 'Dr. John Smith',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Dr. Emily Jones',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Dr. Michael Brown',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Dr. Sarah White',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Dr. James Wilson',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('dentists', null, {});
    }
};
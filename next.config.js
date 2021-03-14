const withSass = require('@zeit/next-sass');

const sass = withSass({
    target: 'serverless',
    env: {
        JWT_SECRET: process.env.JWT_SECRET
    }
});


module.exports = {
    async rewrites() {
        return [
            {
                source: '/:any*',
                destination: '/',
            },
        ];
    },
    sass
};
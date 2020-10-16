module.exports = {
    development: {
        api: {},
        server: {
            GRAPHQLPATH: '/ux/graphql',
            SUBSCRIPTIONPATH: '/ux/subscriptions',
            PORT: 3000,
            whiteList: ['http://dev.ooze.online:8091'],
        },
    },
    production: {
        api: {},
        server: {
            GRAPHQLPATH: '/ux/graphql',
            SUBSCRIPTIONPATH: '/ux/subscriptions',
        },
    },
    staging: {
        api: {},
        server: {
            GRAPHQLPATH: '/ux/graphql',
            SUBSCRIPTIONPATH: '/ux/subscriptions',
        },
    },
}

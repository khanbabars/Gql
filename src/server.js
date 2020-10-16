import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import SETTINGS from './private/settings'
import cors from 'cors'
const { db } = require('./connector/mongoose.config')
import { schema } from './schema/schema.js'
const App = express()
const WebsocketServer = createServer(App)
const settings = SETTINGS[process.env.NODE_ENV].server
const { PORT, SUBSCRIPTIONPATH, GRAPHQLPATH, whiteList } = settings

const customOptions = {
    schema: schema,
    // rootValue passed to GraphQL execution
    rootValue: documentAST => ({
        value: documentAST,
    }),
    // the context passed to GraphQL execution
    context: async protocol => {
        const { req } = protocol
        const { res } = protocol
        const { connection } = protocol
        const { payload } = protocol
        if (connection) {
            const {
                context: { request, socket },
            } = connection
            if (!request || !socket) {
                return undefined
            }
            return null
        }
        return {
            db: await db().then(db => {
                return db.readyState ? db.readyState : 0
            }),
        }
    },
    // Formatting function applied to all errors before response is sent
    formatError: errors => {
        console.log(
            'Error Source : %s, Message : %s, Code : %s',
            errors.name,
            errors.message,
            errors.extensions.code
        )
        errors.extensions.exception.stacktrace.forEach(error => {
            console.log(error)
        })
        return errors
    },
    // * - (optional) validationRules: extra validation rules applied to requests
    //validationRules?: Array<ValidationRule>,
    // a function applied to each graphQL execution result
    formatResponse: response => {
        console.log('Response :  %o', response.data)
        return response
    },
    // a custom default field resolver
    // fieldResolver: () => { },

    // a boolean that will print additional debug logging if execution errors occur
    debug: true,
    //
    tracing: true,
    // cacheControl: false,
    subscriptions: {
        path: SUBSCRIPTIONPATH,
        onConnect: (connectionParams, websocket, context) => {
            websocket.onmessage = e => {
                console.log(e.data)
            }
            return context
        },
        onDisconnect: (webSocket, context) => {},
        onOperation: (message, params, webSocket) => {},
        onOperationComplete: webSocket => {
            // ...
        },
    },
}

const corsOptions = {
    credentials: true,
    origin: whiteList,
}
App.use(cors(corsOptions))
App.use(GRAPHQLPATH, (req, res, next) => {
    res.setHeader('x-powered-by', '© Ooze')
    next()
})
const customConfig = {
    path: GRAPHQLPATH,
    app: App,
    graphiqlOptions: {
        endpointURL: '/ooze', // URL for the GraphQL POST endpoint this instance of GraphiQL serves0
        //  query: getTokenStatusOnStartup, // optional query to pre-populate the GraphiQL UI with
        operationName: 'server', // optional operationName to pre-populate the GraphiQL UI with
        // variables: { guest: "guest" }// optional variables to pre-populate the GraphiQL UI with
    },
    // result: Object, // optional result to pre-populate the GraphiQL UI with
    // passHeader: String, // a string that will be added to the outgoing request header object (e.g "'Authorization': 'Bearer lorem ipsum'")
    // editorTheme: String, // optional CodeMirror theme to be applied to the GraphiQL UI
}
const apollo = new ApolloServer(customOptions)
apollo.applyMiddleware(customConfig)
apollo.installSubscriptionHandlers(WebsocketServer)
WebsocketServer.listen(PORT, () =>
    console.log(
        ` 🚀 Websocket is now running on http://localhost:${PORT}\n`,
        `❤️ Server listening at http://localhost:${PORT}${apollo.graphqlPath}`
    )
)

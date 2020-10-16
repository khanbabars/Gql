import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from '../resolver/app'
const typeDefs = gql`
    type State {
        _id: Int
        state: String
        message: String
        error: Boolean
        meta: String
    }

    type Control {
        type: String
        id: String
        to: String
        key: String
        class: String
        toggle: String
        target: String
        auth: Boolean
        modal: Boolean
        inputType: String
        tag: String
        visibility: Boolean
        generic: Boolean
    }
    type Page {
        _id: Int
        name: String
        path: String
        key: String
        target: String
        containers: String
        auth: Boolean
    }
    type Resource {
        _id: Int
        name: String
        texts: [String]
        text: String
        component: String
    }
    type Column {
        components: [String]
        class: String
        wrapper: String
    }
    type Modal {
        _id: Int
        id: String
        key: String
        target: String
        name: String
        mutation: String
        action: String
        backdrop: String
        data: Boolean
        conditions: String
        controls: [String]
        cachedMutation: String
    }
    type Component {
        _id: Int
        name: String
        key: String
        default: String
        data: Boolean
        mutation: String
        controls: [String]
    }

    type Container {
        _id: Int
        name: String
        key: String
        columns: [Column]
        isRow: Boolean
        class: String
        type: String
    }

    type App {
        _id: ID!
        appName: String
        title: String
        pages: [Page]
        containers: String
        components: String
        controls: String
        modals: String
        states: String
        modalControls: String
        resources: String
    }
    type Query {
        getApp: App
    }

    schema {
        query: Query
    }
`

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

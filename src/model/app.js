import { stringify } from 'querystring'

const mongoose = require('mongoose')
const state = new mongoose.Schema(
    {
        _id: Number,
        state: String,
        message: String,
        error: Boolean,
        meta: String,
    },
    {
        collection: 'States',
        versionKey: false,
    }
)
const control = new mongoose.Schema(
    {
        type: String,
        id: String,
        to: String,
        key: String,
        class: String,
        toggle: String,
        target: String,
        auth: Boolean,
        modal: Boolean,
        inputType: String,
        tag: String,
        visibility: Boolean,
        generic: Boolean,
    },
    { collection: 'Controls', versionKey: false }
)

const app = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        appName: String,
        title: String,
        key: Number,
        pages: [Number],
        containers: [String],
        modals: [Number],
    },
    {
        collection: 'Apps',
        versionKey: false,
    }
)

const page = new mongoose.Schema(
    {
        _id: { type: Number, default: null, required: false },
        name: String,
        path: String,
        key: String,
        target: String,
        containers: String,
        auth: Boolean,
        appName: String,
        appId: { type: mongoose.Schema.Types.ObjectId },
    },
    {
        collection: 'Pages',
        versionKey: false,
    }
)

const column = new mongoose.Schema(
    {
        components: [String],
        wrapper: String,
        class: String,
    },
    {
        collection: 'Contents',
        versionKey: false,
    }
)
const resource = new mongoose.Schema(
    {
        _id: { type: Number, default: null, required: false },
        name: String,
        texts: [String],
        text: String,
        component: String,
    },
    {
        collection: 'Resources',
        versionKey: false,
    }
)
const modal = new mongoose.Schema(
    {
        _id: { type: Number, default: null, required: true },
        id: String,
        target: String,
        key: String,
        name: String,
        mutation: String,
        action: String,
        backdrop: String,
        data: Boolean,
        conditions: String,
        controls: [String],
        cachedMutation: String,
    },
    {
        collection: 'Modals',
        versionKey: false,
    }
)
const component = new mongoose.Schema(
    {
        _id: { type: Number, default: null, required: true },
        name: String,
        key: String,
        default: String,
        data: Boolean,
        mutation: String,
        controls: [String],
    },
    {
        collection: 'Components',
        versionKey: false,
    }
)
const container = new mongoose.Schema(
    {
        _id: { type: Number, default: null, required: true },
        name: String,
        key: String,
        columns: [column],
        isRow: Boolean,
        class: String,
        type: String,
        controller: String,
    },
    {
        collection: 'Containers',
        versionKey: false,
    }
)

export const App = mongoose.model('App', app)
export const Page = mongoose.model('Page', page)
export const Container = mongoose.model('Container', container)
export const Column = mongoose.model('Column', column)
export const Control = mongoose.model('Control', control)
export const Component = mongoose.model('Component', component)
export const Modal = mongoose.model('Modal', modal)
export const Resource = mongoose.model('Resource', resource)
export const State = mongoose.model('State', state)

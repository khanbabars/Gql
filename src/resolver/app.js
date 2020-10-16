import {
    App,
    Page,
    Container,
    Control,
    Component,
    Modal,
    Resource,
    State,
} from '../model/app'

export const resolvers = {
    Query: {
        getApp: async (_, { pathname }, context) =>
            await App.findOne({ appId: 1 }).exec(),
    },
    App: {
        async pages(_, args, context) {
            return Page.find({ _id: { $in: _.pages } }).exec()
        },
        async containers(_, args, context) {
            return Container.find({
                name: { $in: _.containers },
            })
                .exec()
                .then(docs => {
                    return JSON.stringify(docs)
                })
        },
        async components(_, args, context) {
            return Container.find({
                name: { $in: _.containers },
            })
                .exec()
                .then(docs => {
                    let names = []
                    docs.forEach(({ columns }) => {
                        columns.forEach(({ components }) => {
                            names = names.concat(components)
                        })
                    })
                    return Component.find({
                        name: { $in: names },
                    })
                        .exec()
                        .then(docs => {
                            return JSON.stringify(docs)
                        })
                })
        },
        async modals(_, args, context) {
            return Modal.find({
                _id: { $in: _.modals },
            })
                .exec()
                .then(docs => {
                    return JSON.stringify(docs)
                })
        },
        async modalControls(_, args, context) {
            return Modal.find({
                _id: { $in: _.modals },
            })
                .exec()
                .then(docs => {
                    let ids = []
                    docs.forEach(({ controls }) => {
                        controls.forEach(control => {
                            ids = ids.includes(control)
                                ? ids
                                : ids.concat(control)
                        })
                    })
                    return Control.find({
                        id: { $in: ids },
                    }).then(docs => {
                        return JSON.stringify(docs)
                    })
                })
        },

        async controls(_, args, context) {
            return Container.find({
                name: { $in: _.containers },
            })
                .exec()
                .then(docs => {
                    let names = []
                    docs.forEach(({ columns }) => {
                        columns.forEach(({ components }) => {
                            names = names.concat(components)
                        })
                    })
                    return Component.find({
                        name: { $in: names },
                    })
                        .exec()
                        .then(docs => {
                            let ids = []
                            docs.forEach(({ controls }) => {
                                controls.forEach(id => {
                                    ids = ids.includes(id)
                                        ? ids
                                        : ids.concat(id)
                                })
                            })
                            return Control.find({
                                id: { $in: ids },
                            })
                                .exec()
                                .then(docs => {
                                    return JSON.stringify(docs)
                                })
                        })
                })
        },
        async states(_, args, context) {
            return State.find()
                .exec()
                .then(docs => {
                    return JSON.stringify(docs)
                })
        },
        async resources(_, args, context) {
            return Resource.find()
                .exec()
                .then(docs => {
                    return JSON.stringify(docs)
                })
        },
    },
}

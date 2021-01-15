import type { Sequelize, Model } from 'sequelize';
import { brand } from './brand';
import type { brandAttributes, brandCreationAttributes } from './brand';
import { buy } from './buy';
import type { buyAttributes, buyCreationAttributes } from './buy';
import { client } from './client';
import type { clientAttributes, clientCreationAttributes } from './client';
import { component } from './component';
import type { componentAttributes, componentCreationAttributes } from './component';
import { dolzhnost } from './dolzhnost';
import type { dolzhnostAttributes, dolzhnostCreationAttributes } from './dolzhnost';
import { first_inspect } from './first_inspect';
import type { first_inspectAttributes, first_inspectCreationAttributes } from './first_inspect';
import { graphic } from './graphic';
import type { graphicAttributes, graphicCreationAttributes } from './graphic';
import { maker } from './maker';
import type { makerAttributes, makerCreationAttributes } from './maker';
import { model } from './model';
import type { modelAttributes, modelCreationAttributes } from './model';
import { order } from './order';
import type { orderAttributes, orderCreationAttributes } from './order';
import { provider } from './provider';
import type { providerAttributes, providerCreationAttributes } from './provider';
import { pruduct_track } from './pruduct_track';
import type { pruduct_trackAttributes, pruduct_trackCreationAttributes } from './pruduct_track';
import { second_inspect } from './second_inspect';
import type { second_inspectAttributes, second_inspectCreationAttributes } from './second_inspect';
import { status } from './status';
import type { statusAttributes, statusCreationAttributes } from './status';
import { telefone } from './telefone';
import type { telefoneAttributes, telefoneCreationAttributes } from './telefone';
import { users } from './users';
import type { usersAttributes, usersCreationAttributes } from './users';

export {
    brand,
    buy,
    client,
    component,
    dolzhnost,
    first_inspect,
    graphic,
    maker,
    model,
    order,
    provider,
    pruduct_track,
    second_inspect,
    status,
    telefone,
    users,
};

export type {
    brandAttributes,
    brandCreationAttributes,
    buyAttributes,
    buyCreationAttributes,
    clientAttributes,
    clientCreationAttributes,
    componentAttributes,
    componentCreationAttributes,
    dolzhnostAttributes,
    dolzhnostCreationAttributes,
    first_inspectAttributes,
    first_inspectCreationAttributes,
    graphicAttributes,
    graphicCreationAttributes,
    makerAttributes,
    makerCreationAttributes,
    modelAttributes,
    modelCreationAttributes,
    orderAttributes,
    orderCreationAttributes,
    providerAttributes,
    providerCreationAttributes,
    pruduct_trackAttributes,
    pruduct_trackCreationAttributes,
    second_inspectAttributes,
    second_inspectCreationAttributes,
    statusAttributes,
    statusCreationAttributes,
    telefoneAttributes,
    telefoneCreationAttributes,
    usersAttributes,
    usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
    brand.initModel(sequelize);
    buy.initModel(sequelize);
    client.initModel(sequelize);
    component.initModel(sequelize);
    dolzhnost.initModel(sequelize);
    first_inspect.initModel(sequelize);
    graphic.initModel(sequelize);
    maker.initModel(sequelize);
    model.initModel(sequelize);
    order.initModel(sequelize);
    provider.initModel(sequelize);
    pruduct_track.initModel(sequelize);
    second_inspect.initModel(sequelize);
    status.initModel(sequelize);
    telefone.initModel(sequelize);
    users.initModel(sequelize);

    buy.belongsTo(component, { foreignKey: 'component_id' });
    component.hasMany(buy, { foreignKey: 'component_id' });
    buy.belongsTo(provider, { foreignKey: 'maker_id' });
    provider.hasMany(buy, { foreignKey: 'maker_id' });
    component.belongsTo(maker, { foreignKey: 'maker_id' });
    maker.hasMany(component, { foreignKey: 'maker_id' });
    component.belongsTo(telefone, { foreignKey: 'telefone_id' });
    telefone.hasMany(component, { foreignKey: 'telefone_id' });
    model.belongsTo(brand, { foreignKey: 'brand_id' });
    brand.hasMany(model, { foreignKey: 'brand_id' });
    order.belongsTo(client, { foreignKey: 'client_id' });
    client.hasMany(order, { foreignKey: 'client_id' });
    order.belongsTo(users, { foreignKey: 'engineer_id', as: 'engineer' });
    users.hasMany(order, { foreignKey: 'engineer_id', as: 'engineer' });
    order.belongsTo(first_inspect, { foreignKey: 'first_inspect_id' });
    first_inspect.hasMany(order, { foreignKey: 'first_inspect_id' });
    order.belongsTo(users, { foreignKey: 'operator_id', as: 'operator' });
    users.hasMany(order, { foreignKey: 'operator_id', as: 'operator' });
    order.belongsTo(second_inspect, { foreignKey: 'second_inspect_id' });
    second_inspect.hasMany(order, { foreignKey: 'second_inspect_id' });
    order.belongsTo(status, { foreignKey: 'status_id' });
    status.hasMany(order, { foreignKey: 'status_id' });
    order.belongsTo(telefone, { foreignKey: 'telefone_id' });
    telefone.hasMany(order, { foreignKey: 'telefone_id' });
    pruduct_track.belongsTo(component, { foreignKey: 'component_id' });
    component.hasMany(pruduct_track, { foreignKey: 'component_id' });
    pruduct_track.belongsTo(order, { foreignKey: 'order_id' });
    order.hasMany(pruduct_track, { foreignKey: 'order_id' });
    telefone.belongsTo(model, { foreignKey: 'model_id' });
    model.hasMany(telefone, { foreignKey: 'model_id' });
    users.belongsTo(graphic, { foreignKey: 'graphic_id' });
    graphic.hasMany(users, { foreignKey: 'graphic_id' });
    users.belongsTo(dolzhnost, { foreignKey: 'position_id' });
    dolzhnost.hasMany(users, { foreignKey: 'position_id' });

    return {
        brand: brand,
        buy: buy,
        client: client,
        component: component,
        dolzhnost: dolzhnost,
        first_inspect: first_inspect,
        graphic: graphic,
        maker: maker,
        model: model,
        order: order,
        provider: provider,
        pruduct_track: pruduct_track,
        second_inspect: second_inspect,
        status: status,
        telefone: telefone,
        users: users,
    };
}

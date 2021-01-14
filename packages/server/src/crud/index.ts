// Create Read Update Delete
import { Router, json } from 'express';

import { getMany } from './getList';
import { getOne } from './getOne';
import { create } from './create';
import { update } from './update';
import { destroy } from './destroy';
import { UserRole, authRoles } from '../tools/auth';
import { Controller } from '../controllers/controller';

export enum Action {
    GET_LIST = 'GET_LIST',
    GET_ONE = 'GET_ONE',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

type ActionWithRoles = { [key in Action]?: UserRole[] };
interface IOptions {
    actions: Action[] | ActionWithRoles;
    disabledActions: Action[];
    defaultRoles: UserRole[];
}

export const crud = (ctrl: typeof Controller, options?: Partial<IOptions>) => {
    const actionsWR = getActions(options);

    const router = Router();
    router.use(json());

    for (const act in actionsWR) {
        const action: Action = act as Action;
        switch (action as Action) {
            case Action.GET_LIST:
                router.route('').get(authRoles(...actionsWR[action]!), getMany(ctrl));
                break;
            case Action.GET_ONE:
                router.route('/:id').get(authRoles(...actionsWR[action]!), getOne(ctrl));
                break;
            case Action.CREATE:
                router.route('').post(authRoles(...actionsWR[action]!), create(ctrl));
                break;
            case Action.UPDATE:
                router.route('').put(authRoles(...actionsWR[action]!), update(ctrl));
                router.route('/:id').put(authRoles(...actionsWR[action]!), update(ctrl));
                break;
            case Action.DELETE:
                router.route('').delete(authRoles(...actionsWR[action]!), destroy(ctrl));
                router.route('/:id').delete(authRoles(...actionsWR[action]!), destroy(ctrl));
                break;
            default:
                throw new Error(`Unknown action type ${action}`);
        }
    }

    return router;
};

const getActions = ({ actions, disabledActions, defaultRoles }: Partial<IOptions> = {}): ActionWithRoles => {
    let awr: ActionWithRoles = {};

    if (!defaultRoles && (!actions || Array.isArray(actions))) {
        throw Error('defaultRoles must be set');
    }

    for (const action of Object.values(Action)) {
        if (!disabledActions || !disabledActions.includes(action)) {
            awr[action] = defaultRoles;
        }
    }

    if (!actions) {
        return awr;
    }

    if (Array.isArray(actions)) {
        for (const action of actions) {
            if (!disabledActions || !disabledActions.includes(action)) {
                awr[action] = defaultRoles;
            }
        }
    } else {
        for (const actionID in actions) {
            if (actions.hasOwnProperty(actionID)) {
                if (!disabledActions || !disabledActions.includes(actionID as Action)) {
                    awr[actionID as Action] = actions[actionID as Action];
                }
            }
        }
    }
    return awr;
};

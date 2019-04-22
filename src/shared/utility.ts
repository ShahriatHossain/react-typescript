import { startCase, toLower, filter } from 'lodash';

import { BikeIncident } from './interfaces';

export const updateObject = (oldObject: any, updatedProperties: any) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value: any, rules: any) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

export const getIncidentTableHeaderCells = () => {
    return [
        { label: 'ID', name: 'id', isFilterAble: false, isSortAble: false },
        { label: 'Title', name: 'title', isFilterAble: true, isSortAble: false },
        { label: 'Description', name: 'description', isFilterAble: true, isSortAble: false },
        { label: 'Date of Theft', name: 'occurred_at', isFilterAble: false, isSortAble: true },
        { label: 'Date of Case', name: 'updated_at', isFilterAble: false, isSortAble: true },
        { label: 'Location', name: 'address', isFilterAble: false, isSortAble: true }
    ]
}

export const getIncidentTabs = () => {
    return [
        { label: 'Details', name: 'details' },
        { label: 'Events', name: 'events' },
        { label: 'Live Events', name: 'live-events' }
    ]
}

export const getFilterdResult = (items: BikeIncident[], val: string): BikeIncident[] => {
    return filter(
        items,
        (item: BikeIncident) => item.title.toLowerCase().indexOf(val) !== -1 );
}

export const capitalize = (val: string) => startCase(toLower(val));

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
export const range = (from: number, to: number, step: number = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
}

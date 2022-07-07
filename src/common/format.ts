import { buildSortParams, getPaginationParams } from './paginate';
import {
    OptionsTypeOrmGetAllWithoutPagination,
    OptionsTypeOrmGetAllWithPagination,
    RequestGetAllInterface,
} from './interfaces';
import { dynamicFilter } from './filter';

const formatParamsToTypeOrmOptionsWithoutPaginate = <T>(
    queryParams: T & RequestGetAllInterface,
): OptionsTypeOrmGetAllWithoutPagination => {
    const { sortParam, sortOrder } = buildSortParams(queryParams);

    const query = { ...queryParams };

    const where = dynamicFilter(query);

    const build: OptionsTypeOrmGetAllWithoutPagination = {
        where,
        order: { [sortParam]: `${sortOrder}` },
        orderBy: {
            columnName: sortParam,
            order: <'DESC' | 'ASC'>`${sortOrder}`,
        },
    };

    return build;
};

export const formatParamsToTypeOrmOptionsWithPaginate = <T>(
    queryParams: T & RequestGetAllInterface,
): OptionsTypeOrmGetAllWithPagination => {
    const build = formatParamsToTypeOrmOptionsWithoutPaginate(queryParams);

    const { take, skip } = getPaginationParams(queryParams);

    return {
        ...build,
        take,
        skip,
    };
};

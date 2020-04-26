import { TDenomination, TDenominationQuantityMap } from './types';

export const getMoneyChangeService = (sum: number, denomination: TDenomination[]): TDenominationQuantityMap | null => {
    const INF = Infinity;
    const arr = new Array(sum + 1);
    arr[0] = 0;

    for (let m = 1; m <= sum; m++) {
        arr[m] = INF;
        for (let i = 0; i < denomination.length; i++) {
            if (m >= +denomination[i] && arr[m - +denomination[i]] + 1 < arr[m]) arr[m] = arr[m - +denomination[i]] + 1;
        }
    }

    if (arr[sum] === Infinity) {
        console.warn('Невозможно выдать сдачу');
        return null;
    }

    const resultMoney = new Map();

    while (sum !== 0) {
        for (let i = 0; i < denomination.length; i++) {
            if (arr[sum - +denomination[i]] === arr[sum] - 1) {
                const key = denomination[i];
                let value = 1;
                if (resultMoney.has(key)) {
                    value += resultMoney.get(key) as number;
                }

                resultMoney.set(key, value);

                sum -= +denomination[i];
            }
        }
    }

    return resultMoney;
};

export const mergeDepositService = (map1: TDenominationQuantityMap, map2: TDenominationQuantityMap): TDenominationQuantityMap => {
    const cloneMap = new Map(map1);
    map2.forEach((value, key) => {
        let newValue = value;
        if (cloneMap.has(key)) {
            newValue += cloneMap.get(key) as number;
        }

        cloneMap.set(key, newValue);
    });

    return cloneMap;
};

export const getListDenominationService = (map: TDenominationQuantityMap): TDenomination[] => {
    const resultArr: TDenomination[] = [];
    for (const [key, value] of map) {
        if (value) resultArr.push(key);
    }

    return resultArr;
};

export const subtractAmountService = (
    minuend: TDenominationQuantityMap,
    subtrahend: TDenominationQuantityMap,
): TDenominationQuantityMap => {
    const cloneMap = new Map(minuend);
    subtrahend.forEach((value, key) => {
        if (cloneMap.has(key)) {
            cloneMap.set(key, (cloneMap.get(key) as number) - value);
        }
    });

    return cloneMap;
};

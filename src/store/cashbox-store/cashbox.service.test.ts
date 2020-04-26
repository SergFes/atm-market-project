// @ts-ignore
import {
    getListDenominationService,
    getMoneyChangeService,
    mergeDepositService,
    subtractAmountService,
} from './cashbox.service';
import { TDenomination } from './types';

describe('Testing function getMoneyChangeService', function() {
    it('(16, ["10", "2"]) => { 10 => 1, 2 => 3}', () => {
        expect(getMoneyChangeService(16, ['10', '2'])).toEqual(
            new Map([
                ['10', 1],
                ['2', 3],
            ]),
        );
    });

    it('(8, ["5", "2"]) => { 2 => 4 }', () => {
        expect(getMoneyChangeService(8, ['5', '2'])).toEqual(new Map([['2', 4]]));
    });

    it('(13, ["10", "2"]) => null', () => {
        expect(getMoneyChangeService(13, ['10', '2'])).toBeNull();
    });
});


describe('Testing mergeDepositService', function() {
    const map1 = new Map<TDenomination, number>([['2', 4],['10', 4], ['5', 2]]);
    const map2 = new Map<TDenomination, number>([['2', 4]]);
    const result = new Map<TDenomination, number>([['2', 8],['10', 4], ['5', 2]]);
    it('{ 2 => 4, 10 => 4, 5 => 2 } + { 2 => 4 } = { 2 => 8, 10 => 4, 5 => 2 }', () => {
        expect(mergeDepositService(map1, map2)).toEqual(result);
    });
})

describe('Testing getListDenominationService', function() {
    const map1 = new Map<TDenomination, number>([['2', 4],['10', 4], ['5', 2]]);
    it('{ 2 => 4, 10 => 4, 5 => 2 } => ["2", "10", "5"]', () => {
        expect(getListDenominationService(map1)).toEqual(['2', '10', '5']);
    });

    const map2 = new Map<TDenomination, number>([['2', 4],['10', 4], ['5', 0]]);
    it('{ 2 => 4, 10 => 4, 5 => 0 } => ["2", "10"]', () => {
        expect(getListDenominationService(map2)).toEqual(['2', '10']);
    });
})

describe('Testing subtractAmountService', function() {
    const map1 = new Map<TDenomination, number>([['2', 4],['10', 4], ['5', 2]]);
    const map2 = new Map<TDenomination, number>([['2', 4],['10', 4], ['5', 0]]);

    it('{ 2 => 4, 10 => 4, 5 => 2 } - { 2 => 4, 10 => 4, 5 => 0 } => { 2 => 0, 10 => 0, 5 => 2 }', () => {
        expect(subtractAmountService(map1, map2)).toEqual(new Map([['2', 0],['10', 0], ['5', 2]]));
    });

    const map3 = new Map<TDenomination, number>([['2', 4], ['5', 2]]);
    it('{ 2 => 4, 5 => 2 } - { 2 => 4, 10 => 4, 5 => 0 } => { 2 => 0, 5 => 2 }', () => {
        expect(subtractAmountService(map3, map2)).toEqual(new Map([['2', 0], ['5', 2]]));
    });

    it('{ } - { 2 => 4, 10 => 4, 5 => 0 } => { }', () => {
        expect(subtractAmountService(new Map(), map2)).toEqual(new Map());
    });

    it('{ 2 => 4, 10 => 4, 5 => 2 } - { } => { 2 => 4, 10 => 4, 5 => 2 }', () => {
        expect(subtractAmountService(map1, new Map())).toEqual(map1);
    });

})


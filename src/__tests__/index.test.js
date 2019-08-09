import promiseAllSettledByKey from '../index';

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo error'));
const promise3 = new Promise((resolve, reject) => setTimeout(reject, 100));

describe('promiseAllSettledByKey', () => {
    it('should return all resolved and rejected promises by their key', () => {
        return promiseAllSettledByKey({
            theNumberThree: promise1,
            getFoo: promise2,
            nope: promise3
        }).then(({ theNumberThree, getFoo, nope }) => {
            expect(theNumberThree).toEqual({ resolved: true, value: 3 });
            expect(getFoo).toEqual({ resolved: false, value: 'foo error' });
            expect(nope).toEqual({ resolved: false, value: undefined });
        });
    });

    it('should return undefined if no promises object supplied', () => {
        return promiseAllSettledByKey().then(settled => {
            expect(settled).toBeUndefined();
        });
    });

    it('should return ONLY resolved promises', () => {
        return promiseAllSettledByKey({
            theNumberThree: promise1,
            getFoo: promise2,
            nope: promise3
        }, { onlyResolved: true })
        .then(results => {
            expect(Object.keys(results)).toHaveLength(1);
            expect(results).toEqual({
                theNumberThree: { resolved: true, value: 3 }
            });
        });
    });

    it('should return undefined if given ONLY rejected promises', () => {
        return promiseAllSettledByKey({
            getFoo: promise2,
            nope: promise3
        }, { onlyResolved: true })
        .then(results => {
            expect(results).toBeUndefined();
        });
    });

    it('should return ONLY rejected promises', () => {
        return promiseAllSettledByKey({
            theNumberThree: promise1,
            getFoo: promise2,
            nope: promise3
        }, { onlyRejected: true })
        .then(results => {
            expect(Object.keys(results)).toHaveLength(2);
            expect(results).toEqual({
                getFoo: { resolved: false, value: 'foo error' },
                nope: { resolved: false, value: undefined }
            });
        });
    });

    it('should return undefined if given ONLY resolved promises', () => {
        return promiseAllSettledByKey({
            theNumberThree: promise1,
        }, { onlyRejected: true })
        .then(results => {
            expect(results).toBeUndefined();
        });
    });
});
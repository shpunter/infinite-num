export const sub = (
    left: number[],
    right: number[],
    intLenL: number,
    intLenR: number,
): number[] => {
    let [_left, _right] = intLenL >= intLenR ? [left, right] : [right, left];
    const lenDiff = (intLenL - intLenR) * (intLenL > intLenR ? 1 : -1);
    let pl = lenDiff;
    let pr = 0;
    let isSwapped = lenDiff > 0;
    let carryOver = false;
    let shiftIdx = 1;

    while (pr < _right.length) {
        if (_left[pl] < 48 || _right[pr] < 48 ) {
            pr +=1;
            pl +=1;
        }

        let sub = ((_left[pl] ?? 48) - (_right[pr]?? 48)) + 48;

        if (!isSwapped && _left[pl] > _right[pr]) {
            isSwapped = true;
        }

        if (!isSwapped && sub < 48 && lenDiff === 0) {
            [_left, _right] = [right, left];
            isSwapped = true;
            continue;
        }

        if (sub < 48) {
            sub += 10;
            carryOver = true;
        }

        while (carryOver) {
            const _pl = pl - shiftIdx;
            const _pr = pr - shiftIdx;

            if (_left[_pl] < 48 || _right[_pr] < 48) {
                shiftIdx += 1;
                continue;
            }

            if (_left[_pl] !== 48) {
                _pl >= 0 && (_left[_pl] -= 1);
                _pr >= 0 && (_right[_pr] -= 1);

                carryOver = false;
                shiftIdx = 0;
            } else {
                _pl >= 0 && (_left[_pl] = 57);
                _pr >= 0 && (_right[_pr] = 57);
            }

            shiftIdx += 1;
        }

        _left[pl] = sub;
        isSwapped || (_right[pr] = sub);

        pl += 1;
        pr += 1;
    }

    return _left;
};


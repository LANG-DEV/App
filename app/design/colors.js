/**
 * @flow
 */

export default {
    PRIMARY : [
        '#A3CED4', '#1CAAB8', '#10597C', '#10394D'
    ],
    PRIMARY_DARK : [
        '#7591DC', '#2E56C4', '#103DB6', '#0C2D86'
    ],

    SECONDARY : [
        '#FFD479', '#FFB924', '#FFAD00', '#C78700'
    ],
    SECONDARY_DARK : [
        '#FFB879', '#FF8B24', '#FF7800', 'C75E00'
    ],

    GREY : [
        '#DEE3E7', '#979AAB'
    ],

    rgba : (hex : string, alpha : number) => {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [
                    c[0],
                    c[0],
                    c[1],
                    c[1],
                    c[2],
                    c[2]
                ];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [
                (c >> 16) & 255,
                (c >> 8) & 255,
                c & 255
            ].join(',') + ',' + alpha.toString() + ')';
        }
        throw new Error('Bad Hex');
    }
};

function humanized_time_span(date) {
    //Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
    let date_formats = [
        { ceiling: 60 },
        { ceiling: 3600 },
        { ceiling: 86400 },
        { ceiling: 2629744 },
        { ceiling: 31556926 },
        { ceiling: Infinity }
    ];
    //Time units must be be ordered largest -> smallest
    let time_units = [
        [31556926, 'years'],
        [2629744, 'months'],
        [86400, 'days'],
        [3600, 'hours'],
        [60, 'minutes'],
        [1, 'seconds']
    ];

    date = (new Date(date)).getTime();
    var seconds_difference = ((new Date()).getTime() - date) / 1000;


    function get_format() {
        for (var i = 0; i < date_formats.length; i++)
            if (seconds_difference <= date_formats[i].ceiling)
                return date_formats[i];
    }

    function get_time_breakdown() {
        var seconds = seconds_difference;
        var breakdown = {};
        for (var i = 0; i < time_units.length; i++) {
            var occurences_of_unit = Math.floor(seconds / time_units[i][0]);
            seconds = seconds - (time_units[i][0] * occurences_of_unit);
            breakdown[time_units[i][1]] = occurences_of_unit;
        }
        return breakdown;
    }

    function get_representation() {
        let time = get_time_breakdown();
        let relevant_time = [[time.years, 'year'],
        [time.months, 'month'],
        [time.days, 'day'],
        [time.hours, 'hour'],
        [time.minutes, 'minute']
        ];

        let rtf = (new Intl.RelativeTimeFormat('fr', { numeric: "auto" }));

        for (var i = 0; i < relevant_time.length; i++)
            if (relevant_time[i][0] !== 0) {
                return rtf.format(-relevant_time[i][0], relevant_time[i][1]);

            }
        return rtf.format(0, 'second');
    }
    return get_representation();
}

module.exports = humanized_time_span;

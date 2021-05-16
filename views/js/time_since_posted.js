function humanized_time_span(date, ref_date) {
    //Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
    let date_formats = [
        { ceiling: 60, text: "depuis $seconds seconds" },
        { ceiling: 3600, text: "depuis $minutes minutes" },
        { ceiling: 86400, text: "depuis $hours hours" },
        { ceiling: 2629744, text: "depuis $days jours" },
        { ceiling: 31556926, text: "depuis $months mois" },
        { ceiling: Infinity, text: "depuis $years années" }
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
    ref_date = (new Date(ref_date)).getTime();
    var seconds_difference = (ref_date - date) / 1000;


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
        let relevant_time = [(time.years, 'year'),
        (time.months, 'month'),
        (time.days, 'day'),
        (time.hours, 'hour'),
        (time.minutes, 'minute'),
        (time.seconds, 'second')];

        for (var i = 0; i < relevant_time.length - 1; i++)
            if (relevant_time[i][0] !== 0)
                return (new Intl.RelativeTimeFormat('fr')).format(relevant_time[i][0], relevant_time[i][1]);

    }
}
